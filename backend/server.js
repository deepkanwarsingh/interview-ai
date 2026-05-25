import app from './src/app.js';
import connectDB from './src/config/database.js';
import dotenv from 'dotenv';
// import { invokegeminiAi } from './src/services/ai.services.js';
import {resume,selfDescription,jobDescription} from './src/services/temp.js'
import {generateInterviewReport} from "./src/services/ai.services.js"
dotenv.config();

connectDB();


// const report = await generateInterviewReport({ resume, selfDescription, jobDescription })
// // console.log("interview report generated")


// console.log(report)
// Call Gemini AI function
// invokegeminiAi();

app.listen(3000, () => {
    console.log("server is running on port 3000");
});