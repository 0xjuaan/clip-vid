import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    if (req.method === 'POST') {
      const { email, message } = req.body;
  
      const discordWebhookURL = process.env.DISCORD_URL as string;

      console.log(email + "\n\n\n\n\n\n\n\n");
      
  
      // Send a message to the Discord webhook
      await fetch(discordWebhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `New feedback received:\nEmail: ${email}\nFeedback: ${message}`
        }),
      });
      console.log("\n\n\n\n\nFeedback received")
      res.status(200).json({ status: 'ok' });
    } else {
      res.status(405).json({ status: 'error'});
    }
  }
