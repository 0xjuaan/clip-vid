import subprocess
import os

def download_video(id, format, start, end):
    output_dir = "/app/output"
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, "video.mp4")

    #Setting command (downloads required format + best audio, using timestamps if start+end provided)
    if start == "None" or end == "None":
        command = ["yt-dlp", "-f", f"{format}+bestaudio[ext=m4a]", f"youtube.com/watch?v={id}", "-o", output_file]
    else:
        command = ["yt-dlp", "-f", f"{format}+bestaudio[ext=m4a]", "--download-sections", f"*{start}-{end}", f"youtube.com/watch?v={id}", "-o", output_file]
        print(" ".join(command))

    subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=False)
    return output_file

def list_formats(id):

    basic = ["yt-dlp", "-F", f"youtube.com/watch?v={id}"]
    output = subprocess.run(basic, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=False)
    return output.stdout.decode("utf-8")

out = download_video(id='Dwg9Jw_0i18', start="00:00:44", end="00:00:55", format='137')
print(out) 

    



