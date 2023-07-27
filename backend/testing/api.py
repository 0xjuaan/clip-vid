import requests
import json
import time

video = "https://www.youtube.com/watch?v=4ASKMcdCc3g&t=11s"

id = video.split("v=")[1].split("&")[0]

url = "https://clip-container-5e6b1edf9e5e.herokuapp.com/download"

list = "https://clip-container-5e6b1edf9e5e.herokuapp.com/listFormat"

status = "https://clip-container-5e6b1edf9e5e.herokuapp.com/listFormat/status/3d2107f1-52c0-4337-bbca-8cc55279f826"

headers = {
    "Content-Type": "application/json"
}

data2 = {"id":id,"format":"609","start":"00:00","end":"None"}

response = requests.post(url, data=json.dumps(data2), headers=headers, timeout=500)

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