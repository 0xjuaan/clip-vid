import { Tabs, RangeSlider, Select } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { Radio } from '@mantine/core';
import DownloadButton from './download';  


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
export default function Options({duration, setRange, range, quality, id, chapters} : {duration: number, setRange: Function, range: number[], quality: any, id:string, chapters: chapter[]}) {
  // Get duration in seconds
  console.log(duration)
  const seconds = duration;
  const [format, setFormat] = useState('');

  // Get unique values of 'p' from quality array
  let pValues = new Set(); 
  let removals = 0;  

    return (
        <div className="w-full text-teal-600">
        <Tabs className='bg-teal-200' color="teal" defaultValue="first">
          <Tabs.List className='' grow position="apart">
            <Tabs.Tab  value="first">Select Snippet</Tabs.Tab>
            {(chapters.length > 1) && ( // If there are chapters, show this tab
            <Tabs.Tab  value="second">Select Chapter</Tabs.Tab>
            )}
          </Tabs.List>

          <Tabs.Panel value="first" pb="xs">
            Select Snippet {/*Make this a header*/}
            <RangeSlider
                min={0}
                max={seconds}
                minRange={5}
                color="teal"
                size="lg"
                labelAlwaysOn
                label={(value) => formatTime(value)}
                marks={[]}
                onChange={(value) => setRange(value)}
            />  
            
            <Radio.Group
              name="quality"
              label="Select Video Quality"
              onChange={(value) => setFormat(value)}
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
                const conditional = Number(index) == Number(quality.length-1-removals)
                return (
                  <Radio checked={conditional} className="mt-2" key={index} label={`${p}p`} value={String(q.id)} description={q.res}></Radio>
                )
              })
            }
           </Radio.Group>

           <DownloadButton id={id} format={format} start={formatTime(range[0])} end={formatTime(range[1])}/>

            
           

            </Tabs.Panel>

          {(chapters.length > 1) && ( // If there are chapters, show this tab
        <Tabs.Panel value="second" pb="xs">

            <Select
              label="Pick a Chapter to download"
              placeholder="Pick one"
              onChange={(value) => 
                (Number(value) == chapters.length-1)
                ? setRange([Number(moment.duration(`00:${chapters[Number(value)].time}`).asSeconds()), duration])
                : setRange([Number(moment.duration(`00:${chapters[Number(value)].time}`).asSeconds()), Number(moment.duration(`00:${chapters[Number(value)+1].time}`).asSeconds())])
            }
              data={
                chapters.map((chapter: any, index: number) => {
                  if (index == chapters.length-1) {
                    return {value: index.toString(), label: `${chapter.name}: ${chapter.time}-${moment.duration(duration, 'seconds').format('hh:mm:ss')}`}
                  }

                  return {value: index.toString(), label: `${chapter.name}: ${chapter.time}-${chapters[index+1].time}`}
                })
            }
            />
           <DownloadButton id={id} format={format} start={formatTime(range[0])} end={formatTime(range[1])}/>
            </Tabs.Panel>
            )}

            

        </Tabs>
        </div>
        
      );
}