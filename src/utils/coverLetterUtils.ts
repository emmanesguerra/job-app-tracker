import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Generate a professional and personalized cover letter.
 */
export const generateCoverLetterAI = async (
    job: {
        title: string;
        company: string;
        description: string;
    },
    profile: {
        fullName?: string;
        email?: string;
        phone?: string;
        bio?: string;
        skills?: string;
    }
): Promise<string> => {
    const prompt = `
Write a professional, natural, and personalized cover letter based on the following details:

### Job Details
- Job Title: ${job.title}
- Company: ${job.company}
- Job Description: ${job.description}

### Applicant Profile
- Name: ${profile.fullName || "[Your Name]"}
- Email: ${profile.email || ""}
- Phone: ${profile.phone || ""}
- Bio: ${profile.bio || ""}
- Skills: ${profile.skills || ""}

Please keep it concise, engaging, and relevant to the role.
`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text;
    } catch (error) {
        console.error("❌ Error generating cover letter:", error);
        return "Failed to generate cover letter. Please try again.";
    }
};
