import { GoogleGenAI, Type } from "@google/genai";
import { NutritionData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFood = async (foodQuery: string): Promise<NutritionData> => {
  if (!foodQuery.trim()) {
    throw new Error("Please enter a food name.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Analyze the nutritional value of a standard serving of: "${foodQuery}". 
    Provide a realistic estimate for calories, macronutrients (protein, carbs, fat, fiber, sugar), 
    key vitamins/minerals, a health rating from 1-10 (10 being healthiest), 
    and a brief summary of its nutritional benefits or drawbacks.
    Focus on a standard serving size (e.g., 100g, 1 cup, or 1 unit depending on the food).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          foodName: { type: Type.STRING, description: "Capitalized common name of the food" },
          servingSize: { type: Type.STRING, description: "e.g., '100g', '1 medium apple'" },
          calories: { type: Type.NUMBER, description: "Total calories per serving" },
          macros: {
            type: Type.OBJECT,
            properties: {
              protein: { type: Type.NUMBER, description: "Protein in grams" },
              carbs: { type: Type.NUMBER, description: "Total carbohydrates in grams" },
              fat: { type: Type.NUMBER, description: "Total fat in grams" },
              fiber: { type: Type.NUMBER, description: "Dietary fiber in grams" },
              sugar: { type: Type.NUMBER, description: "Total sugars in grams" },
            },
            required: ["protein", "carbs", "fat", "fiber", "sugar"],
          },
          micros: {
            type: Type.OBJECT,
            properties: {
              vitamins: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of significant vitamins (e.g., 'Vitamin C', 'Vitamin A')"
              },
              minerals: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of significant minerals (e.g., 'Iron', 'Calcium')"
              },
            },
            required: ["vitamins", "minerals"],
          },
          healthRating: { type: Type.NUMBER, description: "Score from 1 to 10" },
          healthRatingReason: { type: Type.STRING, description: "Short explanation for the score" },
          summary: { type: Type.STRING, description: "A concise 1-2 sentence nutritional summary" },
        },
        required: ["foodName", "servingSize", "calories", "macros", "micros", "healthRating", "healthRatingReason", "summary"],
      },
    },
  });

  const jsonText = response.text;
  if (!jsonText) {
    throw new Error("No data received from Gemini.");
  }

  try {
    return JSON.parse(jsonText) as NutritionData;
  } catch (error) {
    console.error("Failed to parse JSON", error);
    throw new Error("Failed to parse nutrition data.");
  }
};
