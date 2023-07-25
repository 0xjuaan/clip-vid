import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
const inter = Inter({ subsets: ["latin"] });
import Chapters from "../components/chapters";
import ChapterList from "@/components/chapterList";
import VideoCard from "@/components/videoCard";
import Options from "@/components/options";

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const vid = context.query.v as string;
    
    
    if (vid == "" || vid == undefined || vid == null) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
          query: { error: 'Video not found' },
        },
      };
    }
    const res = await fetch(`http://localhost:3000/api/getInfo?v=${vid}`);
    const data = await res.json();

    if (data.response === "Video not found") 
    {
      return {
        redirect: {
          destination: '/',
          permanent: false,
          query: { error: 'Video not found' },
        },
      };
    } 
    else 
    {
      
      return { props: { videoData: data.response, id: vid} };
    }

    
  };
  
export default function VidInfo({videoData, id} : {videoData: any, id: string}) { //TODO: Later on, change any to a type for safety


  let duration = 600 as number;
  if (/^(\d{2}):(\d{2})$/.test(videoData.duration)) {
    duration = moment.duration(`00:${videoData.duration}`).asSeconds();
    console.log("LETS GIVE IT A " + duration)
  }
  else if (/^(\d{2}):(\d{2}):(\d{2})$/.test(videoData.duration)) {
    duration = moment.duration(videoData.duration).asSeconds();
  }
  else {
    duration = videoData.duration;
  }
  console.log('real' + duration)
  console.log(videoData.duration)
  const [timeRange, setTimeRange] = useState([0, duration ]);
  const router = useRouter();
  const [quality, setQuality] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/quality?v=${id}`)
    .then((res) => res.json())
    .then((data) => {
      setQuality(data.response);
    })
  }, [id])
  return (
    <main>
      <div className={`flex justify-between px-8 py-10`}>
        <h1>[Logo] ClipVid</h1>
        <h1>Dark Mode</h1>
      </div>

      <div className='flex justify-between'>
          <div className="mx-5">

            <VideoCard videoData={videoData} />

            {(videoData.chapters.length > 1)
              && (
                <div>
                <ChapterList chapters={videoData.chapters} /> 
                </div>
              )}

          </div>

          <div className="mx-5 w-2/5">
            <Options duration={duration} setRange={setTimeRange} range={timeRange} quality={quality} id={id} chapters={videoData.chapters}/>
          </div>
      </div>


        
      
    </main>
  );
}
