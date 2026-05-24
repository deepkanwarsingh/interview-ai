import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// console.log("GOOGLE_GENAI_API_KEY:", process.env.GOOGLE_GENAI_API_KEY);

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

export async function invokegeminiAi() {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain what an interview is."
    });

    console.log("Gemini AI Response:", response.text);
    return response.text;
}