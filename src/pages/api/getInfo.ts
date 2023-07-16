import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  response: string | object;
  id: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const videoId = req.query.v as string; 
  console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`);
  
  fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.pageInfo.totalResults === 0) {
          return res.status(404).json({ response: "Video not found", id: videoId });
      }

      const duration = data.items[0].contentDetails.duration
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "");

      
      const usefulData = {
        title: data.items[0].snippet.title,
        thumbnail: data.items[0].snippet.thumbnails.high.url,
        views: data.items[0].statistics.viewCount,
        channel: data.items[0].snippet.channelTitle,
        duration,
        
      };

      return res.status(200).json({ response: usefulData, id: videoId });
    });
}