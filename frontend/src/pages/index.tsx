import { useState } from "react";
import {useRouter} from "next/router";
import  Image  from "next/image";

export default function Home() {
  const router = useRouter();
  const [vid, setVid] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetch(`/api/checkVideo?link=${vid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.response === "Video not found") {
          alert("Video not found")
        } else {
          router.push(`/watch?v=${data.id}`);
        }
      });
  };

  return (
    <main>
		{/* Header */}
		<div className="flex justify-between px-8 py-10 bg-back max-h-8 items-center"> 
			<div className="flex justify-between  items-center">
				<Image src='/clipvid_logo.png' alt='logo' width={80} height={80}></Image>
				<h1 className="items-center ml-2 text-teal-500 text-5xl font-semibold ">ClipVid</h1>
			</div>

			<div className="flex justify-between items-center">
				<button className=" text-black bg-teal-500 h-12 hover:bg-teal-700 font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out">
					Give Feedback
				</button>
				<Image className="text-white" src='/twitter.svg' alt='logo' width={80} height={80}></Image>

			</div>
    		
      	</div>

      	<div className="flex-col w-3/5 mx-auto">
			<h1 className="text-center text-7xl font-semibold my-12 w-full">
			Enter your video link
			</h1>

			<div className="flex justify-center">

				<input
				onChange={(e) => setVid(e.target.value)}
				className=" text-gray-900 placeholder:text-gray-900 placeholder:opacity-40 bg-teal-500 hover:outline-teal-200 focus:outline-teal-200 text-sm outline-none font-semibold rounded-lg  block w-full max-w-5xl h-12 px-2 transition duration-150 ease-in-out"
				type="text"
				placeholder="e.g youtube.com/watch?v=dQw4w9WgXcQ ;)">
				</input>

				<button
					onClick={(e) => handleSubmit(e)}
					className="font-semibold mx-5 rounded-lg bg-back w-20">
					Clip <span>-&gt;</span>
				</button>
			</div>
      </div>
    </main>
  );
}
