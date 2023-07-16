import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';

const inter = Inter({ subsets: ["latin"] });

export default function Grome() {
  const router = useRouter();
  const [videoData, setVideoData] = useState({
    title: "",
    duration: "",
    views: "",
    channel: "",
    thumbnail: "",
  });

  useEffect(() => {
    const { id } = router.query;

    if (id !== undefined && id !== null && id !== "") {
        fetch(`/api/getInfo?v=${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log("f", data);
            if (data.response === "Video not found") {
                router.push(`/`)
            } else {
                console.log(data)
                setVideoData(data.response);
            }
            });

    }
    }, [router.query]);
  
  return (
    <main>
      <div className={`flex justify-between px-8 py-10`}>
        <h1>[Logo] ClipVid</h1>
        <h1>Dark Mode</h1>
      </div>
      <h1 className={`text-center text-9xl font-semibold my-12 w-full`}>
        Title: {videoData.title}
        <br></br>
        Duration: {videoData.duration}
        <br></br>
        Views: {videoData.views}
        <br></br>
        Channel: {videoData.channel}
        <br></br>
        Thumbnail: <Image alt="thumbnail" src={videoData.thumbnail} width={500} height={500}/>
      </h1>
    </main>
  );
}
