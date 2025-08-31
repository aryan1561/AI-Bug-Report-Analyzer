
import { GoogleGenAI, Type } from "@google/genai";
import { BugAnalysis, PriorityLevel } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A concise, one-sentence summary of the bug.",
        },
        priority: {
            type: Type.STRING,
            description: `Classify the priority. Must be one of: '${PriorityLevel.Critical}', '${PriorityLevel.High}', '${PriorityLevel.Medium}', '${PriorityLevel.Low}'.`,
            enum: [PriorityLevel.Critical, PriorityLevel.High, PriorityLevel.Medium, PriorityLevel.Low],
        },
        category: {
            type: Type.STRING,
            description: "Suggest a category for the bug. Examples: 'UI/UX', 'Backend', 'Authentication', 'Performance', 'Database', 'Security'.",
        },
        reproducibilitySteps: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
            description: "A clear, numbered list of steps to reproduce the bug based on the report.",
        },
        suggestedFix: {
            type: Type.STRING,
            description: "A high-level technical suggestion for a possible fix, including potential files or components to investigate.",
        },
    },
    required: ["summary", "priority", "category", "reproducibilitySteps", "suggestedFix"],
};


export async function analyzeBugReport(report: string): Promise<BugAnalysis> {
    try {
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Please analyze the following bug report:\n\n---\n${report}\n---`,
            config: {
                systemInstruction: "You are an expert software engineer and QA analyst. Your task is to analyze a given bug report and provide a structured analysis in a valid JSON format based on the provided schema. Do not include any markdown formatting like ```json.",
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
            }
        });

        const jsonString = result.text.trim();
        const parsedResult = JSON.parse(jsonString);

        // Validate priority level to ensure it matches the enum
        if (!Object.values(PriorityLevel).includes(parsedResult.priority)) {
            throw new Error(`Invalid priority level received: ${parsedResult.priority}`);
        }

        return parsedResult as BugAnalysis;

    } catch (error) {
        console.error("Error analyzing bug report with Gemini API:", error);
        throw new Error("Failed to get a valid analysis from the AI model.");
    }
}
