import React, { useState,useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

      }, [loading]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            setLoading(true);
            console.log("before",loading);
            const response = await axios.post("http://localhost:3000", {
                data: input,
            });
            console.log(response.data);

            const botMessage = { sender: "bot", text: response.data };
            setMessages((prevMessages) => [...prevMessages, botMessage]);

            setLoading(false);
            console.log("after",loading);
        } catch (error) {
            const errorMessage = {
                sender: "bot",
                text: "Sorry, there was an error processing your request.",
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);

            setLoading(false);
            console.log("after",loading);
        }

        setInput(""); // Clear input field
    };



    return (
        <div className="flex flex-col h-screen max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg">
            {/* Chat Box */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`my-2 p-3 rounded-lg ${msg.sender === "user"
                                ? "bg-blue-500 text-white self-end flex justify-end"
                                : "bg-gray-300 text-black self-start flex justify-start"
                            }`}
                    >
                        {msg.sender === "bot" && loading ? "Loading..." : msg.text}
                    </div>
                ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center p-4 border-t border-gray-300 bg-white">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSend}
                    className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
