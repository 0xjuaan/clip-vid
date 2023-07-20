import type { NextApiRequest, NextApiResponse } from "next";
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

type Data = any

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    const body = req.body;
    
    fetch('http://localhost:5000/download', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    },)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        return res.status(200).json({ url: data.url });
    });
    
}  




      