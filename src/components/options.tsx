import { Tabs } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import { useState, useEffect, useRef } from 'react';

export interface chapter {
    name: string;
    time: string;
}
export default function Options() {
    return (
        <div className="w-96">
        <Tabs defaultValue="first">
          <Tabs.List grow position="center">
            <Tabs.Tab value="first">First tab</Tabs.Tab>
            <Tabs.Tab value="second">Second tab</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <h1 className="text-end	">Hello G</h1>
        </div>
      );
}