import requests
import json
import time

video = "https://www.youtube.com/watch?v=be9RJp4f4Pc&t=11s"
id = video.split("v=")[1].split("&")[0]

download = "http://157.230.195.21:80/download"
list = "http://157.230.195.21:80/listFormat"

headers = {
    "Content-Type": "application/json"
}

data3 = {
    "id": 'Dwg9Jw_0i18',
}
def status():
    gettage = requests.post(list, data=json.dumps(data3), headers=headers, timeout=500)
    print(gettage.json())
    return gettage.json()

data2 = {"id":'f7Lfukf0IKY',"format":"137","start":"00:11","end":"00:31"}

def download_video(format):
    data2['format'] = format
    print("sending a request with data:", data2)
    response = requests.post(download, data=json.dumps(data2), headers=headers, timeout=500)

    if response.ok:
        print(response.json())
    else:
        print(response.json()['Error'],": Code is", response.status_code)

    newting = "http://174.138.23.36:80" + response.json()['Location']
    print(newting)
    time.sleep(0.1)

    req2 = requests.get(newting, timeout=500)
    print(req2.json())

    while (req2.json()['state'] != "SUCCESS"):  
        time.sleep(1)
        req2 = requests.get(newting, timeout=500)
        print(req2.json())

status()
format = input("Enter format: ")
download_video(format)

#$ kubectl get pods
##NAME                                 READY   STATUS    RESTARTS   AGE
#celery-deployment-76bbc8c667-x7zl6   1/1     Running   0          56s
#flask-deployment-6677987dbc-5vhpp    1/1     Running   0          65s