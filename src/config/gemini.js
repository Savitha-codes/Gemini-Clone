import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"


const MODEL_NAME = "gemini-1.5-flash";

const API_KEY = "AIzaSyBH1BK2ZdqEzkQiZdvaeiIlRosWtkthKOc"; // ⚠ Replace this with your actual API key.

async function runChat(prompt) {
  // Initialize the Gemini AI client with your API key.
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Get a specific generative model.
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  }
  ];

  const chat = model.startChat({
  generationConfig,
  safetySettings,
  history: [], // Starts with an empty chat history.
});

// Send a new message to the chat and wait for a response.
const result = await chat.sendMessage(prompt);

// Extract the response content from the result.
const response = result.response;

// Log the text content of the response to the console.
console.log(response.text());
return response.text();
}

export default runChat;