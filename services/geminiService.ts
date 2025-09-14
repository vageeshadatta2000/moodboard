import { GoogleGenAI, Type } from "@google/genai";
import { PinData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const conceptSchema = {
    type: Type.OBJECT,
    properties: {
        concepts: {
            type: Type.ARRAY,
            description: "A list of 12 specific, visually-rich concepts related to the theme for a mood board.",
            items: {
                type: Type.STRING,
            },
        },
    },
    required: ["concepts"],
};

export const generateMoodBoardConcepts = async (theme: string, onProgress: (message: string) => void): Promise<PinData[]> => {
  try {
    onProgress("Generating creative concepts...");
    const conceptPrompt = `You are a creative assistant for designing mood boards. 
    Based on the theme "${theme}", generate a list of 12 specific, visually rich concepts.
    Each concept should be a short, descriptive string that is a perfect prompt for an image generation AI.
    For example, for "vintage Parisian cafe", concepts could be "a wicker chair on a cobblestone street, soft morning light" or "close up on steam rising from a fresh espresso cup on a marble table".`;

    const conceptResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conceptPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: conceptSchema,
      },
    });

    const jsonString = conceptResponse.text.trim();
    const parsedResponse = JSON.parse(jsonString);
    const concepts = parsedResponse.concepts as string[];

    if (!concepts || concepts.length === 0) {
      throw new Error("Could not generate any concepts from the theme.");
    }
    
    const successfulPins: PinData[] = [];
    
    // Process image generation sequentially to avoid rate limiting
    for (let i = 0; i < concepts.length; i++) {
        const concept = concepts[i];
        onProgress(`Creating image ${i + 1} of ${concepts.length}...`);
        try {
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: concept + ", photorealistic, high detail, aesthetic",
                config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/jpeg',
                  aspectRatio: '3:4',
                },
            });
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            successfulPins.push({
                id: self.crypto.randomUUID(),
                description: concept,
                imageUrl: `data:image/jpeg;base64,${base64ImageBytes}`,
            });
        } catch (error) {
            console.error(`Image generation failed for concept: "${concept}"`, error);
            // Continue to the next image even if one fails
        }
    }

    if (successfulPins.length === 0) {
        throw new Error("Image generation failed for all concepts. This might be due to API limits or a restrictive prompt. Please try again later or with a different theme.");
    }

    return successfulPins;

  } catch (error) {
    console.error("Error generating mood board:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate mood board. API error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the mood board.");
  }
};