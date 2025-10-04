require('dotenv').config();
const { GoogleGenAI } = require("@google/genai") ;

// const key = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({});

async function generateResponse(chatHistory) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: chatHistory,
  });
 return response.text
}

module.exports = generateResponse;