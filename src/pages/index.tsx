import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className={`flex justify-between px-8 py-10`}>
        <h1>[Logo] ClipVid</h1>
        <h1>Dark Mode</h1>
      </div>
      <div className="flex-col w-3/5 mx-auto">
        <h1 className={`text-center text-9xl font-semibold my-12 w-full`}>Enter your video link</h1>
        <div className="flex">
        <input className="text-gray-900 bg-green-400 focus:border-black text-sm rounded-lg  block w-full max-w-5xl h-12" type="text" ></input>
        <button className="mx-5">CLICK ME!</button>
        </div>
      </div>
      <div className="flex-col w-3/5 my-12 mx-auto ">
        <h1 className={`text-center text-5xl font-semibold my-12 w-full`}>Steps to download your video</h1>
      </div>
      
    </main>
  )
}
