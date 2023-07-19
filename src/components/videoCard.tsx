import Image from "next/image";

export default function VideoCard({videoData} : {videoData: any}) {
  return (
    <div className='rounded bg-slate-800 w-324 p-3'>

        <div className="flex justify-center relative">
            <Image className="" alt="thumbnail" src={videoData.thumbnail} width={320} height={180}/>
            <h1 className="absolute bottom-1 right-1 bg-black bg-opacity-60">{videoData.duration}</h1>

        </div>
        <div>
            <h1 className="text-left">{videoData.title}</h1>
            <h1 className="text-left text-xs">{videoData.channel}</h1>
        </div>
    </div>
  );
}