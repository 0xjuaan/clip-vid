import subprocess
import os

def download_video(id, format, start, end):
    output_dir = "/app/output"
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, "video.mp4")
    outputFormat = "mp4"

    #Setting command (downloads required format + best audio, using timestamps if start+end provided)
    if start == "None" or end == "None":
        command = ["yt-dlp", "-f", f"{format}+bestaudio[ext=m4a]", "--merge-output-format", outputFormat, "--force-keyframes-at-cuts", id, "-o", output_file]
    else:
        command = ["yt-dlp", "-f", f"{format}+bestaudio[ext=m4a]", "--merge-output-format", outputFormat, "--download-sections", f"*{start}-{end}", "--force-keyframes-at-cuts", id, "-o", output_file]
    subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=False)
    return output_file


    

