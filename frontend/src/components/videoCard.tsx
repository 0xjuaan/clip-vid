import Image from "next/image";
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

export default function VideoCard({videoData} : {videoData: any}) {

  // This code was copied from watch.tsx
  let duration = 600 as number;
  let secondsFormatted = null;
  if (/^(\d{2}):(\d{2})$/.test(videoData.duration)) { //mm:ss format
    duration = moment.duration(`00:${videoData.duration}`).asSeconds();
  }
  else if (/^(\d{2}):(\d{2}):(\d{2})$/.test(videoData.duration)) { //hh:mm:ss format
    duration = moment.duration(videoData.duration).asSeconds();
  }
  else {
    secondsFormatted = `00:${videoData.duration}`; //seconds already
  }
  const formattedDuration = moment.duration(duration, "seconds").format("hh:mm:ss", {trim: true});


  return (
    <div className='rounded bg-teal-500 w-648 p-3'>

        <div className="flex justify-center relative">
            <Image className="" alt="thumbnail" src={videoData.thumbnail} width={640} height={360}/>
            <h1 className="absolute bottom-1 right-1 bg-black bg-opacity-60">{!secondsFormatted ? formattedDuration : secondsFormatted}</h1>

        </div>
        <div className="text-black">
            <h1 className="text-left font-bold ">{videoData.title}</h1>
            <h1 className="text-left text-xs font-semibold">{videoData.channel}</h1>
        </div>
    </div>
  );
}