import {Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

import { useState, useEffect } from 'react';


export default function DownloadButton({id, format, start, end} : {id: string, format: string, start: string, end: string}) {
    const [downLink, setDownLink] = useState<any>(null)

    const handleDownload = () => {
        setDownLink('pending')
        fetch('http://localhost:3000/api/download', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: "BRlr37jUMFs", // Get prop
            format: "133", // Get prop
            start: "00:1:04", // Get formatted prop
            end: "00:2:04", // Get formatted prop
          })
        },)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)   
            setDownLink(data.url)
        });
      }

      useEffect(() => {
        if (downLink !== 'pending') {
            const link = document.getElementById('invis') as HTMLAnchorElement;
            link.click();
        }
        }, [downLink])
            

    return (
        <div className="flex justify-center">
           <Button loading={downLink == 'pending'} onClick={() => handleDownload()} radius="lg" color="teal" leftIcon={<IconDownload size="1rem" />} className="bg-teal-500 mx-2">
              Download Video
            </Button>

            <a id="invis" href={downLink}></a>
        </div>
    )
}