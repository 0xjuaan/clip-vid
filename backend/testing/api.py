import requests
import json
import time

video = "https://www.youtube.com/watch?v=be9RJp4f4Pc&t=11s"
id = video.split("v=")[1].split("&")[0]

download = "https://clip-container-5e6b1edf9e5e.herokuapp.com/download"
list = "https://clip-container-5e6b1edf9e5e.herokuapp.com/listFormat"

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

data2 = {"id":id,"format":"137","start":"00:04","end":"00:24"}
def download_video(format):
    data2['format'] = format
    print("sending a request with data:", data2)
    response = requests.post(download, data=json.dumps(data2), headers=headers, timeout=500)

    if response.ok:
        print(response.json())
    else:
        print(response.json()['Error'],": Code is", response.status_code)

    newting = "https://clip-container-5e6b1edf9e5e.herokuapp.com" + response.json()['Location']
    print(newting)
    time.sleep(0.1)

    req2 = requests.get(newting, timeout=500)
    print(req2.json())

    while (req2.json()['state'] != "SUCCESS"):  
        time.sleep(1)
        req2 = requests.get(newting, timeout=500)
        print(req2.json())

status()
#download_video("137")