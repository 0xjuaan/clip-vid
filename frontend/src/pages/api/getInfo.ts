import type { NextApiRequest, NextApiResponse } from "next";
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

type Data = {
  response: string | object;
  id: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
  const videoId = req.query.v as string; 
  fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
  )
    .then((response) => response.json())
    .then((data) => {
      
      if (data.pageInfo.totalResults === 0) {
          return res.status(404).json({ response: "Video not found", id: videoId });
      }
      const duration = moment.duration(data.items[0].contentDetails.duration).format("hh:mm:ss")
      const seconds = moment.duration(data.items[0].contentDetails.duration).asSeconds()

      const description = data.items[0].snippet.description as string;

      const parseChapters = (description :string) => {
        // Extract timestamps (either 00:00:00, 0:00:00, 00:00 or 0:00)
        const lines = description.split("\n")
        const regex = /(\d{0,2}:?\d{1,2}:\d{2})/g
        const chapters = []
      
        for (const line of lines) {
          // Match the regex and check if the line contains a matched regex
          const matches = line.match(regex)
          if (matches) {
            const ts = matches[0]
            const title = line
              .split(" ")
              .filter((l) => !l.includes(ts))
              .join(" ")
              .replace(/^-/, '')
              .replace(/^ /, '');
      
            chapters.push({
              name: title, time: ts
            })
          }
        }
        return chapters
      }


      
      const usefulData = {
        title: data.items[0].snippet.title,
        thumbnail: data.items[0].snippet.thumbnails.high.url.replace("hqdefault", "maxresdefault"),
        views: data.items[0].statistics.viewCount,
        channel: data.items[0].snippet.channelTitle,
        duration,
        seconds,
        chapters: parseChapters(description),
        
      };

      return res.status(200).json({ response: usefulData, id: videoId });
    });
  } catch (error) {
    return res.status(500).json({ response: "Internal Server Error", id: 'error' });
  }
}
