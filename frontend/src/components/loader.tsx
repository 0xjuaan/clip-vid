import { Tabs, RangeSlider, Select } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { Radio } from '@mantine/core';
import DownloadButton from './download';  
import Slider from './slider';
import ChapterList from './chapterList';
import { BarWave } from "react-cssfx-loading";
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

export interface chapter {
    name: string;
    time: string;
}

export default function Loader({chapters} : {chapters: chapter[]}) {

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
            <div className=" flex flex-col items-center justify-center">
                <h1 className='text-black font-semibold mb-5'>Loading video quality options</h1>
                <BarWave color="#22c7b7" />
            </div>
            </Tabs.Panel>

          <Tabs.Panel value="second" pb="xs">
                <ChapterList chapters={chapters} /> 
          </Tabs.Panel>
        </Tabs>
        </div>
        
      );
}


         