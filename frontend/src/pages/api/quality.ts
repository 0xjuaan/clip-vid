import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  response: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    const videoId = req.query.v as string;
    const ip = 'http://157.230.195.21:80/'
    try {
        fetch(ip + 'listFormat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: videoId})
    })
    .then((response) => response.json())
    .then((data) => {
        return res.status(200).json({ response: data.formats });
    });
    } catch (error) {
        return res.status(400).json({ response: "Some error occured"});
    }
    

}
