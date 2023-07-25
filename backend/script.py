import subprocess
import os

def download_video(id, format, start, end):
    output_dir = "/app/output"
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, "video.mp4")

    #Setting command 
    if start == "None" or end == "None":
        command = ["yt-dlp", "-f", format, f"youtube.com/watch?v={id}", "-o", output_file]
    else:
        command = ["yt-dlp", "-f", format, "--download-sections", f"*{start}-{end}", f"youtube.com/watch?v={id}", "-o", output_file]
    subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=False)
    return output_file

def list_formats(id):
    basic = ["yt-dlp", "-F", f"youtube.com/watch?v={id}"]
    output = subprocess.run(basic, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=False)

    return output.stdout.decode("utf-8")

# video_url = "https://www.youtube.com/watch?v=0twUQ0znVks"
# out = download(url=video_url, start="00:00:04", end="00:00:06")

    

