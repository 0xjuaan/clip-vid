import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  response: string;
  id: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const link = req.query.link as string;
  let videoId: string;
  if (link.includes("youtu.be")) {
    videoId = link.split(".be/")[1].split("&")[0] as string;
  } 
  else {
    videoId = link.split("v=")[1].split("&")[0] as string;
  }
  
  fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.pageInfo.totalResults === 0) {
          return res.status(404).json({ response: "Video Not Found", id: videoId });
      }

      return res.status(200).json({ response: "Video Found", id: videoId });
    });
}
