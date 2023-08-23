import type { NextApiRequest, NextApiResponse } from "next";

type Data = any


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    const statusURL = req.body.statusURL;
    
    const response = await fetch(statusURL);
    const data = await response.json();

    return res.status(200).json(data);

}  






      