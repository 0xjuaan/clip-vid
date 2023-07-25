from flask import Flask, request, jsonify, url_for
import os
import script
import boto3
import uuid
from botocore.client import Config
import parseFormats as pf
import os
from celery import Celery
app = Flask(__name__)
redis_url = os.environ.get('REDIS_URL')
celery = Celery(app.name, broker=redis_url)
celery.conf.update(result_backend=redis_url)

s3 = boto3.client('s3',
    region_name='syd1',  # Replace with your Spaces region
    endpoint_url='https://vids.syd1.digitaloceanspaces.com',  # Replace with your Spaces endpoint URL
    aws_access_key_id='DO00W8N7V3TPE222VDX7',
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
    config=Config(signature_version='s3v4')
)


@celery.task(bind=True)
def process(self, videoId, start_time, end_time, format):

    # Download using script.py, and get local file path
    file_path = script.download_video(id=videoId, format=format, start=start_time, end=end_time)
    
    # generate a unique file name
    file_name = f'{start_time}-{end_time}{uuid.uuid4().hex[:5]}.mp4'  

    # Uploading to spaces
    try:
        with open(file_path, 'rb') as data:
            s3.upload_fileobj(data, 'vids', file_name)
    except Exception as e:
        print(f"Failed to upload file: {e}")
    
    # Generate a presigned url for the uploaded file
    presigned_url = s3.generate_presigned_url('get_object',
        Params={
            'Bucket': 'vids',
            'Key': file_name
        },
        # Presigned url will be valid for 1 hour
        ExpiresIn=3600  
    )

    # Delete the local file after uploading it to Spaces
    os.remove(file_path)

    return presigned_url


@app.route('/download', methods=['POST'])
def download():
    videoId = request.json.get('id')
    start_time = request.json.get('start')
    end_time = request.json.get('end')
    format = request.json.get('format')

    # Start the celery task
    try:
        task = process.apply_async(args=[videoId, start_time, end_time, format])
    except Exception as e:
        print(f"Error starting celery task: {e}")
        return jsonify({'Error': e}), 500

    return jsonify({'Location': url_for('taskstatus', task_id=task.id)}), 202

@app.route('/listFormat', methods=['POST'])
def listFormat():
    videoId = request.json.get('id')

    # Get the list of data via `yt-dlp -F <videoId>`
    output = script.list_formats(id=videoId)

    # Parse output to get list of formats
    parsed_data = pf.parse(output)

    return jsonify({'formats': parsed_data})

@app.route('/status/<task_id>')
def taskstatus(task_id):
    task = process.AsyncResult(task_id)
    if task.state == 'PENDING':
        response = {
            'state': task.state,
            'current': 0,
            'total': 1,
            'status': 'Pending...'
        }
    elif task.state != 'FAILURE':
        response = {
            'state': task.state,
            'current': 1,
            'total': 1,
            'status': 'Task completed successfully',
            'url': str(task.result)  # this will contain the presigned URL
        }
    else:
        # something went wrong in the background job
        response = {
            'state': task.state,
            'current': 1,
            'total': 1,
            'status': 'Task failed',
            'error': str(task.info)  # this is the exception raised 
        }
    return jsonify(response)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)




