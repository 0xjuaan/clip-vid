import { Timeline, Text } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import { useState, useEffect, useRef } from 'react';

export interface chapter {
    name: string;
    time: string;
}
export default function ChapterList({chapters} : {chapters: chapter[]}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [overFlow, setOverFlow] = useState(false);
  
  useEffect(() => {
    const checkOverflow = () => {
        if (containerRef.current) {
            setOverFlow(containerRef.current.scrollHeight > containerRef.current.clientHeight);
        }
    };
    // Check initially in case the content is already overflowing
    checkOverflow();

    // Check whenever the window is resized
    window.addEventListener('resize', checkOverflow);

    // Clean up after ourselves to avoid memory leaks
    return () => window.removeEventListener('resize', checkOverflow);

}, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  chapters = chapters.slice(1)
  return (
    <div className='items-center'>
      <h1 className= 'text-3xl text-center font-semibold my-2 w-full'>Chapters</h1> 

      <div ref={containerRef} className=" max-h-[300px] overflow-y-auto scrollbar scrollbar-thumb-teal-100 scrollbar-track-teal-900">

        <Timeline color="teal" active={chapters.length} bulletSize={24} lineWidth={2} className="mx-2">
          {chapters.map((chapter, index) => (
            <Timeline.Item key={index} bullet={<IconClock size={12} />} title={chapter.name} className='text-black'>
              <p className="text-gray-500 font-medium">{chapter.time}</p>
            </Timeline.Item>
            ))}
        </Timeline>
      </div>
    </div>

  );
}