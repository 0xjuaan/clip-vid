import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
const inter = Inter({ subsets: ["latin"] });
import Chapters from "../components/chapters";

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
      return { props: { data: data.response } };
    }
  };
  
export default function VidInfo({data} : {data: any}) { //TODO: Later on, change any to a type for safety
  const router = useRouter();
  const [videoData, setVideoData] = useState(data);
  console.log(videoData.chapters)
  return (
    <main>
      <div className={`flex justify-between px-8 py-10`}>
        <h1>[Logo] ClipVid</h1>
        <h1>Dark Mode</h1>
      </div>


      <div className="flex justify-center">
        <div className={`flex-col items-center justify-center text-center`}>

        <div className="flex justify-center">
        <Image alt="thumbnail" src={videoData.thumbnail} width={300} height={300}/>
        </div>
        <h1>{videoData.channel}- {videoData.title}</h1>
        <h1>{videoData.duration}</h1>
        
        </div>
      </div>
      <div className={`items-center`}>
        {
          (videoData.chapters.length > 0)
          ? (
          <div className={'flex items-center justify-center'}>
            <div>
            <h1 className={`text-center text-3xl font-semibold mt-12 w-full`}>Chapters</h1> 
            <Chapters chapters={videoData.chapters} />
            </div>
          </div>)
          : <></>
        }
      </div>

        
      
    </main>
  );
}
