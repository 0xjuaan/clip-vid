import {Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

import { useState, useEffect } from 'react';

function Status({status, statusMessage, setval} : {status: string, statusMessage: string, setval: Function}) {

    if (status == 'pending') {
      const totalDownloadTime = 20000;
        setTimeout(() => {
          setval("2")
          setTimeout(() => {
            setval("3")
          }, totalDownloadTime * 0.7);
        }, totalDownloadTime * 0.1); 
      
        return (
            <div className="flex justify-center">
                <p className="text-gray-500">{statusMessage}</p>
            </div>
        )
    } else if (status == 'failed') {
        return (
            <div className="flex justify-center">
                <p className="text-red-500">Download failed</p>
            </div>
        )
    } else if (status) {
        return (
            <div className="flex justify-center">
                <p className="text-green-500">Download complete</p>
            </div>
        )
    }
}

export default function DownloadButton({id, format, start, end} : {id: string, format: string, start: string, end: string}) {
    const [downLink, setDownLink] = useState<any>(null)
    const [statusMessage, setStatusMessage] = useState<string>('Fetching Video Information')

    let thing = "Video"

    if (start != '0' || end != '0') {
      thing = "Clip"
    }

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
            
    //  <Status status={downLink} setval={setStatusMessage} statusMessage={statusMessage}/>
    
    return (
        <div className="flex justify-center group ">
           <Button size="xl" loading={downLink == 'pending'} onClick={() => handleDownload()} radius="lg" color="teal" leftIcon={<IconDownload size="25" />} className="bg-teal-500 mx-2">
              Download {thing}
            </Button>
            <a id="invis" href={downLink}></a>
        </div>
    )
}