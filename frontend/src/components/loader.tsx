import { Tabs, RangeSlider, Select } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { Radio } from '@mantine/core';
import DownloadButton from './download';  
import Slider from './slider';
import ChapterList from './chapterList';

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

export interface chapter {
    name: string;
    time: string;
}

function formatTime(seconds: number) {
    if (seconds < 60) {
        return (seconds < 10) ? `00:0${seconds}`:`00:${seconds}`
    }
    else {
        return moment.duration(seconds, 'seconds').format('hh:mm:ss')
    }
}
export default function Loader({duration, setRange, range, quality, id, chapters, setFormat} : {duration: number, setRange: Function, range: number[], quality: any, id:string, chapters: chapter[], setFormat: Function}) {
  // Get duration in seconds
  const seconds = duration;
  // Get unique values of 'p' from quality array
  let pValues = new Set(); 
  let removals = 0;  

    return (
        <div className="w-full text-teal-600">
        <Tabs className='bg-teal-200 rounded-xl' color="teal" defaultValue="first" variant="pills">

          <Tabs.List className='rounded-xl font-semibold' grow position="apart">
            <Tabs.Tab  value="first">Select Video Quality</Tabs.Tab>
            {(chapters.length > 1) && ( // If there are chapters, show this tab
            <Tabs.Tab  value="second">Select Chapter</Tabs.Tab>
            )}
          </Tabs.List>

          <Tabs.Panel value="first" pb="xs" className="px-4">
            <h1>Loading video quality options</h1>
            </Tabs.Panel>

          <Tabs.Panel value="second" pb="xs">
                <ChapterList chapters={chapters} /> 
          </Tabs.Panel>
        </Tabs>
        </div>
        
      );
}


         