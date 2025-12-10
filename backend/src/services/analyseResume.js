import { OpenAI } from "openai";
import { buildPrompt } from "./prompt.js";

const client = new OpenAI({
    baseURL: process.env.HF_URL,
    apiKey: process.env.HF_API_KEY,
});

const analyseResume = async (role, jobDesc, resumeText) => {
    const prompt = buildPrompt(role, jobDesc, resumeText);
    const response = await client.chat.completions.create({
        model: "openai/gpt-oss-20b:groq",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
    });

    const content = response.choices[0]?.message?.content?.trim() || {};
    console.log(content);
    const result = JSON.parse(content);

    return result;
};

export { analyseResume };
