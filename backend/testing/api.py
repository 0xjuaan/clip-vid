import requests
import json
import time

video = "https://www.youtube.com/watch?v=yRoOd7in0n8&t=11s"

id = video.split("v=")[1].split("&")[0]

url = "https://clip-container-5e6b1edf9e5e.herokuapp.com/download"

list = "https://clip-container-5e6b1edf9e5e.herokuapp.com/listFormat"

status = "https://clip-container-5e6b1edf9e5e.herokuapp.com/listFormat/status/3d2107f1-52c0-4337-bbca-8cc55279f826"

headers = {
    "Content-Type": "application/json"
}

data2 = {"id":id,"format":"617","start":"00:00","end":"00:11"}
data3 = {
    "id": 'Dwg9Jw_0i18',
}
#response = requests.post(url, data=json.dumps(data2), headers=headers, timeout=500)
gettage = requests.post(list, data=json.dumps(data3), headers=headers, timeout=500)
print(gettage.json())

"""
if response.status_code == 200 or response.status_code == 202:
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


#135 mp4   854x480     25    │   20.65MiB  270k https │ avc1.4D401E    270k video only          480p, mp4_dash"""
