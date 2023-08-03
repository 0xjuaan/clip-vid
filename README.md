# ClipVid
The first youtube to mp4 service that lets you download snippets of youtube videos. 

## Tech Stack

**Frontend:**  
- NextJS (Page Router, Typescript)  
- TailwindCSS

**Backend:**  
- Flask (For Web Process)  
- Celery, Redis (For Async Worker Process)  
- yt-dlp (Python package to download youtube vids)  
- Docker (To containerise web and worker processes)


## Average Times

10 second video (834.60KiB) 6.6 seconds
1 minute video (21.60MiB) 16.2 seconds
6:34 minute video (forgot to count, long time)
10 minute video ()


## Commands to push backend

heroku container:push --recursive -a clip-container
heroku container:release web worker -a clip-container


## Newer commands
docker build -f Dockerfile.web -t juandocker1/clip-cluster:flask . 
docker build -f Dockerfile.worker -t juandocker1/clip-cluster:celery . 
kubectl rollout restart deployment/flask-deployment 