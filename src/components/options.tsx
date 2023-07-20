import { Tabs, RangeSlider } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import { useState, useEffect, useRef } from 'react';
import { Radio, Group } from '@mantine/core';

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

export interface chapter {
    name: string;
    time: string;
}
export default function Options({duration, setRange, range, quality} : {duration: string, setRange: Function, range: number[], quality: any}) {
  const seconds = (moment.duration(duration).asSeconds())/60 as number;

  console.log(quality)
  let pValues = new Set(); // Used to track unique p values
  let removals = 0;
    return (
        <div className="w-full text-teal-600">
        <Tabs className='bg-teal-200' color="teal" defaultValue="first">
          <Tabs.List className='' grow position="apart">
            <Tabs.Tab  value="first">Select Timestamps</Tabs.Tab>
            <Tabs.Tab  value="second">Select Chapter</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pb="xs">
            Select Timestamp {/*Make this a header*/}
            <RangeSlider
                min={0}
                max={seconds}
                minRange={5}
                color="teal"
                size="lg"
                labelAlwaysOn
                label={(value) => (value < 60) ? `00:${value}` : `${moment.duration(value, 'seconds').format('hh:mm:ss')}`}
                marks={[]}
                onChange={(value) => setRange(value)}
            />    
            <h1>Ok so u want to download from {(range[0] < 60) ? `00:${range[0]}` : `${moment.duration(range[0], 'seconds').format('hh:mm:ss')}`} to {(range[1] < 60) ? `00:${range[1]}` : `${moment.duration(range[1], 'seconds').format('hh:mm:ss')}`}</h1>
            
            <Radio.Group
              name="quality"
              label="Select Video Quality"
            >
            {
              quality.filter((q: any) => {
                const p = q.res.split('x')[1];
                if(pValues.has(p)) { // If 'p' is already in set, skip this iteration
                  removals += 1;
                  return false;
                } else { // Otherwise, add 'p' to set
                  pValues.add(p);
                  return true;
                }})
              .map((q: any, index: number) => { //Map the filtered array
                const p = q.res.split('x')[1];
                console.log(Number(index) == Number(quality.length-1-removals)) //Returns true
                return (
                  <Radio checked={Number(index) == Number(quality.length-1-removals)} className="mt-2" key={index} label={`${p}p`} value={String(q.id)} description={q.res}></Radio>
                )
              })
            }
           </Radio.Group>
           

            </Tabs.Panel>
        <Tabs.Panel value="second" pb="xs">
            Select Chapter {/*Make this a header*/}
            </Tabs.Panel>
      
        </Tabs>
        </div>
        
      );
}