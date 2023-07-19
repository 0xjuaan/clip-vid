import { Tabs, RangeSlider } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import { useState, useEffect, useRef } from 'react';

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

export interface chapter {
    name: string;
    time: string;
}
export default function Options({duration} : {duration: string}) {
  const seconds = (moment.duration(duration).asSeconds())/60 as number;

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
            />    
            </Tabs.Panel>
        <Tabs.Panel value="second" pb="xs">
            Select Chapter {/*Make this a header*/}
            </Tabs.Panel>
      
        </Tabs>
        </div>
      );
}