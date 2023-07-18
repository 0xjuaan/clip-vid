import { Tabs, RangeSlider } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import { useState, useEffect, useRef } from 'react';

export interface chapter {
    name: string;
    time: string;
}
export default function Options() {
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
                max={24}
                minRange={0.2}
                color="teal"
                size="lg"
                labelAlwaysOn
                marks={[
                ]}
            />    
            </Tabs.Panel>
        <Tabs.Panel value="second" pb="xs">
            Select Chapter {/*Make this a header*/}
            </Tabs.Panel>
      
        </Tabs>
        </div>
      );
}