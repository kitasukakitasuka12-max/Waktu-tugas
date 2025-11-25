import { GoogleGenAI, Type } from "@google/genai";
import { CommissionData } from "../types";

// Helper to safely access process.env without crashing in browser environments
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;
  } catch {
    return undefined;
  }
};

const apiKey = getApiKey();
// Only initialize AI if API key is present to avoid constructor errors or runtime crashes
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Fallback data in case API key is missing or fails
const FALLBACK_DATA: CommissionData = {
  amount: 75000,
  currency: "IDR",
  message: "Tugas selesai! Sistem telah memverifikasi aktivitas Anda.",
  taskId: "TSK-9982-LOCAL"
};

export const generateCommissionReport = async (): Promise<CommissionData> => {
  if (!ai) {
    console.warn("API Key not found or process.env unavailable, returning fallback data.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return FALLBACK_DATA;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a realistic commission report for a completed 5-minute viewing task. The user is Indonesian.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            amount: { type: Type.NUMBER, description: "Random amount between 50000 and 150000" },
            currency: { type: Type.STRING, description: "Always IDR" },
            message: { type: Type.STRING, description: "A congratulatory message in Indonesian about the funds being ready." },
            taskId: { type: Type.STRING, description: "A fake transaction ID like TASK-XXXX" }
          },
          required: ["amount", "currency", "message", "taskId"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as CommissionData;
    }
    return FALLBACK_DATA;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return FALLBACK_DATA;
  }
};
