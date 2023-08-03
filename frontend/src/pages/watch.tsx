import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import VideoCard from "@/components/videoCard";
import Options from "@/components/options";
import Slider from '@/components/slider';
import DownloadButton from "@/components/download";
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
import { IconBrandTwitterFilled } from '@tabler/icons-react';


import {formatTime} from "@/utils/formatTime";
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
  if (/^(\d{2}):(\d{2})$/.test(videoData.duration)) { //mm:ss format
    duration = moment.duration(`00:${videoData.duration}`).asSeconds();
  }
  else if (/^(\d{2}):(\d{2}):(\d{2})$/.test(videoData.duration)) { //hh:mm:ss format
    duration = moment.duration(videoData.duration).asSeconds();
  }
  else {
    duration = videoData.duration; //seconds already
  }

  const [timeRange, setTimeRange] = useState([0, duration]);
  const router = useRouter();
  const [quality, setQuality] = useState([]);
  const [format, setFormat] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/api/quality?v=${id}`)
    .then((res) => res.json())
    .then((data) => {
      setQuality(data.response);
      setFormat(data.response[Math.floor(data.response.length/2)].id);
    })
  }, [id])

  return (
    <main>
      <div className="flex justify-between px-8 py-10 mb-10 bg-back max-h-8 items-center"> 
      <Link href='/'>

			<div className="flex justify-between  items-center">
				<Image src='/clipvid_logo.png' alt='logo' width={80} height={80}></Image>
				<h1 className="items-center ml-2 text-teal-500 text-5xl font-semibold ">ClipVid</h1>
			</div>
      
      </Link>


			<div className="flex justify-between items-center">
        <Link href="https://twitter.com/truechosenjuan">
          <IconBrandTwitterFilled size={40} color="#000" className="text-teal-500 mx-6"/>
        </Link>
				<button className=" text-black bg-teal-500 h-12 hover:bg-teal-700 font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out">
					Give Feedback
				</button>

			</div>
    		
      	</div>

      <div className='flex justify-between'>
          <div className="mx-5">

            <div className="relative">
              <VideoCard videoData={videoData} />
              
              <Slider duration={duration} setRange={setTimeRange}/>
            </div>
            <DownloadButton id={id} format={format} start={(timeRange[0] == 0) ? '0' : formatTime(timeRange[0])} end={(timeRange[1] == duration) ? '0' : formatTime(timeRange[1])}/>

            

          </div>
          { (quality.length != 0 && quality) ? (
          <div className="mx-5 w-2/5">
            <Options duration={duration} setRange={setTimeRange} setFormat={setFormat} range={timeRange} quality={quality} id={id} chapters={videoData.chapters}/>
          </div>)
          : (<div></div>)
          }
      </div>


        
      
    </main>
  );
}
