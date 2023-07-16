import { Inter } from 'next/font/google'
import {useState} from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [vid, setVid] = useState('')

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log(vid)
    const data = fetch('/api/getVideo', {
      
    }).then((res) => res.json())
  }

  return (
    <main>
      <div className={`flex justify-between px-8 py-10`}>
        <h1>[Logo] ClipVid</h1>
        <h1>Dark Mode</h1>
      </div>
      <div className="flex-col w-3/5 mx-auto">
        <h1 className={`text-center text-9xl font-semibold my-12 w-full`}>Enter your video link</h1>
        <div className="flex justify-center">
        <input onChange={(e)=>setVid(e.target.value)}className=" text-gray-900 bg-green-400 focus:border-black text-sm rounded-lg  block w-full max-w-5xl h-12" type="text" ></input>
        <button onClick={(e)=>handleSubmit(e)} className=" mx-5 rounded-lg bg-green-700">CLICK ME!</button>
        </div>
      </div>
      <div className="flex-col w-3/5 my-12 mx-auto ">
        <h1 className={`text-center text-5xl font-semibold my-12 w-full`}>Steps to download your video</h1>
      </div>
      
    </main>
  )
}
