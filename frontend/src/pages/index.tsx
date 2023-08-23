import { useState } from "react";
import {useRouter} from "next/router";
import  Image  from "next/image";
import { useDisclosure } from '@mantine/hooks';
import { Modal, TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import Head	from 'next/head';

export default function Home() {
  const router = useRouter();
  const [vid, setVid] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  
  const form = useForm({
    initialValues: {
      email: '',
	  message: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });


  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetch(`/api/checkVideo?link=${vid}`)
      .then((res) => {
		if (res.ok) return res.json()
		else alert("Invalid link")
		return null
	})
      .then((data) => {
		if (data === null) return
        if (data.response === "Video not found") {
          alert("Video not found")
        } else {
          router.push(`/watch?v=${data.id}`);
        }
      });
  };
  async function submit(values: any) {

	fetch(`/api/feedback`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(values)
	})
	.then((res) => {
		if (!res.ok) alert("Error submitting feedback")
		else return res.json()
	})
	.then((data) => {
		if (data === null) return
		alert("Feedback submitted!")
	});
  }

  return (
	<>
	<Head>
        <title>ClipVid</title>
        <meta name="description" content="Free YouTube video clipper" />
        <link rel="icon" href="/clipvid_logo.png" />
    </Head>

    <main>
		
		<Modal opened={opened} onClose={close} title="Please tell us about your experience" centered>
		<Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => {close(); submit(values);} )}>
        <TextInput
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

		<TextInput
          withAsterisk
          label="Your message"
          placeholder="I love this app!"
          {...form.getInputProps('message')}
        />

        <Group position="center" mt="md">
          <Button className="bg-teal-500 text-white hover:bg-teal-800" type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
      </Modal>
		{/* Header */}
		<div className="flex justify-between px-8 py-10 bg-back max-h-8 items-center"> 
			<div className="flex justify-between  items-center">
				<Image src='/clipvid_logo.png' alt='logo' width={80} height={80}></Image>
				<h1 className="items-center ml-2 text-teal-500 text-5xl font-semibold ">ClipVid</h1>
			</div>

			<div className="flex justify-between items-center text-black">
				<button onClick={open} className=" text-black bg-teal-500 h-12 hover:bg-teal-700 font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out">
					Give Feedback
				</button>
				

			</div>
    		
      	</div>

      	<div className="flex-col w-3/5 mx-auto">
			<h1 className="text-center text-7xl font-semibold my-12 w-full">
			Enter your video link
			</h1>

			<div className="flex justify-center">

				<input
				onChange={(e) => setVid(e.target.value)}
				className=" text-gray-900 placeholder:text-gray-900 placeholder:opacity-40 bg-teal-500 hover:outline-teal-200 focus:outline-teal-200 text-sm outline-none font-semibold rounded-lg  block w-full max-w-5xl h-12 px-2 transition duration-150 ease-in-out"
				type="text"
				placeholder="e.g youtube.com/watch?v=dQw4w9WgXcQ ;)">
				</input>

				<button
					onClick={(e) => handleSubmit(e)}
					className="group font-semibold mx-5 rounded-lg bg-back w-20">
					Clip 
					<span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
						-&gt; 
					</span>
				</button>
				
			</div>
			
      </div>
    </main>
	</>
  );
}
