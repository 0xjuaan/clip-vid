import type { NextApiRequest, NextApiResponse } from "next";

type Data = any

// Function to poll the status until the task is done
async function pollStatus(statusUrl :string) {
    let response, data;
  
    do {
      // You may want to add a delay here to not overwhelm your server
      await new Promise(r => setTimeout(r, 2000));
      
      response = await fetch(statusUrl);
      data = await response.json();

      console.log(data.state)
      if (data.state === 'FAILED') {
        return null;
      }

    } while(data.state !== 'SUCCESS' && response.ok);
  
    if(response.ok) {
      // The task is done, handle the presigned URL
      return data.url;

    } else {
      // Handle the error
      console.error(data);
    }
  }
  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    // Send the request to download the vid
    const body = req.body;
    const ip = 'http://157.230.195.21:80/'
    const response = await fetch(ip + 'download', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        const data = await response.json();

        const statusURL = ip + data.Location
        const url = await pollStatus(statusURL);

        if (!url || url === null || url === undefined) {
            return res.status(500).json({ error: 'Failed to download file' });
        }

        return res.status(200).json({ url: url });
}  






      