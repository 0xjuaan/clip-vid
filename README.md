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
