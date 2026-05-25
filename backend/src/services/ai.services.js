import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import puppeteer from "puppeteer";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number(),
    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),
    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),
    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ),
    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    ),
    title: z.string()
});

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    try {

        console.log("Generating interview report");

        const prompt = `
Generate an interview report.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(interviewReportSchema),
            }
        });

        console.log("Interview report generated");

        return JSON.parse(response.text);

    } catch (error) {

        console.log("Interview Report Error:", error);

    }
}

async function generatePdfFromHtml(htmlContent) {

    try {

        console.log("Launching browser");

        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        console.log("Setting HTML");

        await page.setContent(htmlContent, {
            waitUntil: "load"
        });

        console.log("Generating PDF");

        const pdfBuffer = await page.pdf({
            format: "A4",
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });

        await browser.close();

        console.log("PDF Generated");

        return pdfBuffer;

    } catch (error) {

        console.log("PDF Error:", error);

    }
}

async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription
}) {

    try {

        console.log("Generating Resume PDF");

        const resumePdfSchema = z.object({
            html: z.string()
        });

        const prompt = `
Generate a professional ATS-friendly HTML resume.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY valid JSON:
{
   "html": "<html>...</html>"
}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(resumePdfSchema),
            }
        });

        console.log("Resume HTML generated");

        const jsonContent = JSON.parse(response.text);

        console.log("Converting HTML to PDF");

        const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

        return pdfBuffer;

    } catch (error) {

        console.log("Resume PDF Error:", error);

    }
}

export {
    generateInterviewReport,
    generateResumePdf
};