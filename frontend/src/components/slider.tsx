import { Tabs, RangeSlider, Select } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

function formatTime(seconds: number) {
    if (seconds < 60) {
        return (seconds < 10) ? `00:0${seconds}`:`00:${seconds}`
    }
    else {
        return moment.duration(seconds, 'seconds').format('hh:mm:ss')
    }
}

export default function Slider({duration, setRange} : {duration: number, setRange: Function}) {
    return (
        <RangeSlider
            min={0}
            max={duration}
            minRange={5}
            color="teal"
            size="lg"
            labelAlwaysOn
            label={(value) => formatTime(value)}
            marks={[]}
            onChange={(value) => setRange(value)}
        />  
    )
}