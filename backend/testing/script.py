import subprocess
import os

def download_video(id, format, start, end):
    output_dir = "/testing/output"
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, "video.mp4")
    outputFormat = "mp4"

    #Setting command (downloads required format + best audio, using timestamps if start+end provided)
    if start == "None" or end == "None":
        command = ["yt-dlp", "-f", f"{format}+bestaudio[ext=m4a]", "--merge-output-format", outputFormat, "--force-keyframes-at-cuts", id, "-o", output_file]
    else:
        command = ["yt-dlp", "-f", f"{format}+bestaudio[ext=m4a]", "--merge-output-format", outputFormat, "--download-sections", f"*{start}-{end}", "--force-keyframes-at-cuts", id, "-o", output_file]
        print(command)
    res = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=False)
    return output_file, res

id= "Dwg9Jw_0i18"
out, res = download_video(id=id, start="00:00:04", end="00:00:06", format="135")
print(res)

    

