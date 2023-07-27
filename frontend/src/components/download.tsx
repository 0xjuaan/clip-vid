import {Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

import { useState, useEffect } from 'react';


export default function DownloadButton({id, format, start, end} : {id: string, format: string, start: string, end: string}) {
    const [downLink, setDownLink] = useState<any>(null)

    const handleDownload = () => {
        
        const body = JSON.stringify({
            id: id,
            format: format,
            start: start,
            end: end,
          })
          console.log(body)

        setDownLink('pending')
        fetch('http://localhost:3000/api/download', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: body
        })
        .then((res) => {
          if (!res.ok) setDownLink('failed')
          else return res.json()
        })
        .then((data) => {
          setDownLink(data.url)
        })
      }

      useEffect(() => {
        if (downLink !== 'pending' && downLink !== 'failed') {
            const link = document.getElementById('invis') as HTMLAnchorElement;
            link.click();
        }
        }, [downLink])
            

    return (
        <div className="flex justify-center">
           <Button loading={downLink == 'pending'} onClick={() => handleDownload()} radius="lg" color="teal" leftIcon={<IconDownload size="1rem" />} className="bg-teal-500 mx-2">
              Download Video
            </Button>
            f
            <a id="invis" href={downLink}></a>
        </div>
    )
}