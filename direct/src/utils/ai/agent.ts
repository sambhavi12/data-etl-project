import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

// Define the output schema for the verification
const VerificationSchema = z.object({
    compliance_score: z.number().describe("Score from 0-100 indicating how well the project meets professional standards + formatting"),
    security_score: z.number().describe("Score from 0-100 based on mentioned security practices"),
    complexity_score: z.number().describe("Score from 0-100 based on technical depth described"),
    feedback_summary: z.string().describe("A concise 2-sentence summary of the analysis"),
    badges: z.array(z.string()).describe("List of earned badges e.g. 'Pixel Perfect', 'Secure', 'Optimized'")
});

export async function verifyProject(title: string, description: string) {
    const model = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0,
        openAIApiKey: process.env.OPENAI_API_KEY
    });

    const structuredLlm = model.withStructuredOutput(VerificationSchema);

    const prompt = `
    You are a Senior Technical Auditor for a specialized platform called "Direct".
    Your job is to verify "Proof of Work" based on project submissions.
    
    Analyze the following project submission:
    Title: ${title}
    Description: ${description}
    
    Provide a professional assessment. Be strict. High scores (90+) are reserved for exceptional work.
  `;

    return await structuredLlm.invoke(prompt);
}
