import type { NextApiRequest, NextApiResponse } from "next";
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

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
    console.log('sending ' + JSON.stringify(body))
    
    const response = await fetch('https://clip-container-5e6b1edf9e5e.herokuapp.com/download', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        const data = await response.json();

        const statusURL = "https://clip-container-5e6b1edf9e5e.herokuapp.com" + data.Location
        console.log('now going to: ' + statusURL)
        const url = await pollStatus(statusURL);
        console.log('got url: ' + url)
        return res.status(200).json({ url: url });
}  






      