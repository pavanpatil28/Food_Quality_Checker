const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI("AIzaSyACGDmiQX8y1hiaRmsQ1LjNUaaWFy0J-BM");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run(code) {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const prompt = `Study all the text and give all the health benefits of the text pointwise each must contain 3lines of data and explain the benefits in simple words dont give the message that we need more information tell all the benefits which can be given. list the benefits pointwise and on different lines with gap between two points ${code}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
}

module.exports = { run };
