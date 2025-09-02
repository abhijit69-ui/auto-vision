import { GoogleGenerativeAI } from '@google/generative-ai';

// Function to convert file to base64
async function fileToBase64(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString('base64');
}

export async function processCarImageAI(file: File) {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const base64Image = await fileToBase64(file);

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: file.type,
      },
    };

    const prompt = `
    Analyze this car image and extract the following information:
    1. Make (manufacturer)
    2. Model
    3. Year (approximately)
    4. Color
    5. Body type (SUV, Sedan, Hatchback, etc.)
    6. Mileage
    7. Fuel type (your best guess)
    8. Transmission type (your best guess)
    9. Price (your best guess)
    10. Short Description as to be added to a car listing

    Format your response as a clean JSON object with these fields:
    {
        "make": "",
        "model": "",
        "year": 0000,
        "color": "",
        "price": "",
        "mileage": "",
        "bodyType": "",
        "fuelType": "",
        "transmission": "",
        "description": "",
        "confidence": 0.0,
    }

    For confidence, provide a value between 0 and 1 representing how confident you are
    in your overall identification.
    Only respond with the JSON object, nothing else.
    `;

    const result = await model.generateContent([imagePart, prompt]);
    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, '').trim();

    try {
      const carDetails = JSON.parse(cleanedText);

      const requiredFields = [
        'make',
        'model',
        'year',
        'color',
        'bodyType',
        'price',
        'mileage',
        'fuelType',
        'transmission',
        'description',
        'confidence',
      ];

      const missingFields = requiredFields.filter(
        (field) => !(field in carDetails)
      );

      if (missingFields.length > 0) {
        throw new Error(
          `AI response missing required fields: ${missingFields.join(', ')}`
        );
      }

      return {
        success: true,
        data: carDetails,
      };
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return {
        success: false,
        error: 'Failed to parse AI response',
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error('Gemini API error: ' + error.message);
    } else {
      console.error(error);
      throw new Error('Gemini API error: Unknown error');
    }
  }
}
