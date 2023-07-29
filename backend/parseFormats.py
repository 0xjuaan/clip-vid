import re

# Define regular expressions
id_pattern = r"\d+"
res_pattern = r"\d+x\d+"
filesize_pattern = r"(\d+\.\d+)(MiB|KiB|GiB)"

def parse(data):
    # Split content into lines and filter out lines containing 'mp4'
    lines = data.split('\n')
    mp4_lines = [line for line in lines if 'mp4' in line and 'dash' in line]

    # Define list to hold parsed data
    parsed_data = []

    # Define dictionary to hold old data
    old = {}

    # Parse lines
    for line in mp4_lines:
        id_match = re.search(id_pattern, line)
        res_match = re.search(res_pattern, line)
        filesize_match = re.search(filesize_pattern, line)

        if id_match and res_match and filesize_match:
            size, unit = filesize_match.groups()
            size = float(size)
            if unit == "KiB":
                size *= 1024  # Convert to bytes
            elif unit == "MiB":
                size *= 1024 * 1024  # Convert to bytes
            elif unit == "GiB":
                size *= 1024 * 1024 * 1024  # Convert to bytes

            # If resolution already exists in old data
            if res_match.group() in old:
                # If new filesize is smaller than old filesize
                if size < old[res_match.group()]["filesize"]:
                    # Remove old data
                    parsed_data = [data for data in parsed_data if data['res'] != res_match.group()]

                    # Append new data to the final list
                    parsed_data.append({
                        "id": int(id_match.group()),
                        "res": res_match.group(),
                        "filesize": size/1024/1024
                    })
                    # Update old data
                    old[res_match.group()] = {"id": int(id_match.group()), "filesize": size}
            else:
                # If resolution does not exist in old data
                parsed_data.append({
                    "id": int(id_match.group()),
                    "res": res_match.group(),
                    "filesize": size/1024/1024
                })
                # Add new data to old data
                old[res_match.group()] = {"id": int(id_match.group()), "filesize": size}

    return parsed_data

