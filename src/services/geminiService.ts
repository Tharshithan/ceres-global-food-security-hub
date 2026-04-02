import { GoogleGenAI } from "@google/genai";
import { CropData, MarketPrice, LogisticsAlert, Insight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateActionableInsights(
  cropData: CropData[],
  marketPrices: MarketPrice[],
  alerts: LogisticsAlert[]
): Promise<Insight[]> {
  const prompt = `
    As a Global Food Security Analyst for "Ceres", analyze the following real-time data and provide 3-4 high-impact actionable insights.
    
    Crop Health Data: ${JSON.stringify(cropData)}
    Market Prices: ${JSON.stringify(marketPrices)}
    Logistics Alerts: ${JSON.stringify(alerts)}
    
    Return the response as a JSON array of objects with the following structure:
    {
      "id": "unique-id",
      "title": "Short descriptive title",
      "content": "Detailed analysis and recommendation (markdown supported)",
      "category": "climate" | "market" | "logistics",
      "impact": "high" | "medium" | "low"
    }
    
    Focus on:
    1. Mitigating risks in critical regions.
    2. Optimizing surplus distribution.
    3. Predicting price volatility impacts on food access.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating insights:", error);
    return [
      {
        id: 'fallback-1',
        title: 'Data Analysis Interrupted',
        content: 'Unable to reach AI analysis engine. Please check connectivity or API configuration.',
        category: 'climate',
        impact: 'medium'
      }
    ];
  }
}
