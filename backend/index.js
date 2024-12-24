import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API using AI/ML api
// app.post("/", async (req, res) => {
//     const baseURL = process.env.BASE_URL;
//     const apiKey = process.env.API_KEY;
//     const userPrompt = req.body.data;
//     const systemPrompt = "You are a blockchain expert. Keep it simple and very short and always be helpful. Be descriptive when necessary only";

//     const api = new OpenAI({
//         apiKey,
//         baseURL,
//     });

//     const completion = await api.chat.completions.create({
//         model: "mistralai/Mistral-7B-Instruct-v0.2",
//         messages: [
//             {
//                 role: "system",
//                 content: systemPrompt,
//             },
//             {
//                 role: "user",
//                 content: userPrompt,
//             },
//         ],
//         temperature: 0.7,
//         max_tokens: 256,
//     });

//     const response = completion.choices[0].message.content;


//     res.send(response);
// });


// API using Gemini api
app.post("/", async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const {data, chats , systemPrompt} = req.body;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `System Prompt: ${systemPrompt}\n\nPrevious Conversation:${JSON.stringify(chats)}\n\nUser Prompt: ${data}`;

    const result = await model.generateContent(prompt);
    
    res.send(result.response.text());
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});

