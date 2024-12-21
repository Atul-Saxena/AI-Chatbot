import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const mychatbot = () => {
    const [chat, setChat] = useState([]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("hello it is a default message");


    const handlesubmit = async (e) => {
        // e.preventDefault();
        setLoading(true);

        const AIresponse = await axios.post(`http://localhost:3000`, { data: input })
            .then((response) => {
                setResponse(response.data);
            });
        const newChat = { user: input, AI: response };
        setChat([...chat, newChat]);
        setLoading(false);

        setInput("");
    };

    return (
        <>
            <div className='h-screen w-screen bg-zinc-900 text-white mx-auto flex flex-col justify-center items-center' >

                <div className="w-1/2 mt-5 mb-5 overflow-y-scroll scrollbar-hide">

                    {chat.map((item, index) => (
                        <>
                            <div className='w-full flex flex-col justify-center items-center mb-11' key={index}>

                                <div className="w-full h-[40px] flex justify-end items-center mb-10 rounded-md pr-8">
                                    <h3 className='text-xl text-gray-900 dark:text-white' key={index}>{item.user} : User</h3>
                                </div>

                                <div className=" w-full flex justify-start items-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
                                    <p className='text-xl text-gray-900 dark:text-white' key={index}>AI : {item.AI}</p>
                                </div>

                            </div>
                        </>
                    ))}

                </div>

                <div className="w-2/3 mt-5 mb-5 flex justify-end">

                    <input
                        className="mr-2.5 h-full min-h-[54px] w-full rounded-lg border px-5 py-5 text-sm font-medium focus:outline-0 border-zinc-800 bg-transparent text-white placeholder:text-zinc-400"
                        placeholder="Type your message here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <button
                        className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-auto flex h-[unset] w-[200px] items-center justify-center rounded-lg px-4 py-5 text-base font-medium bg-white hover:bg-white/80 active:bg-white/90 text-black"
                        onClick={handlesubmit}
                    >
                        Submit
                    </button>

                </div>

            </div>
        </>
    )
}

export default mychatbot