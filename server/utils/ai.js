const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Prompt Enhancer
const improvementPrompt = `
You are a professional prompt engineer.
Your job is to improve the user's prompt for generating web apps using HTML, CSS, and JavaScript.
Your task is to enhance the user's prompt by making it more specific, detailed, and clear, but also keeping it simple.
Your output should be a single line of text, without any additional explanations or formatting.

Example input:
Create a sortable todo list app

Example output:
Build a responsive and accessible task manager using modern HTML5, CSS3 (Flexbox/Grid), and vanilla JavaScript (ES6+), featuring task creation, inline editing, completion toggling, deletion, drag-and-drop reordering, and persistent storage via localStorage, with clean UI/UX optimized for both mobile and desktop.
`;

async function promptimprover(userPrompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${improvementPrompt}\n\nUser input:\n${userPrompt}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (err) {
    console.error("🔥 Error in promptimprover():", err);
    throw err;
  }
}

// Code Generator Prompt (System Prompt style)
const codeSystemPrompt = `
You are a senior front-end developer and expert AI assistant.

Your goal is to generate full, clean, and working front-end code for web applications using only HTML, CSS, and vanilla JavaScript. The generated code must be readable, modern, and production-ready.

### Output Requirements:

1. Return a complete HTML document with:
   - <!DOCTYPE html> declaration
   - <html>, <head>, and <body> sections
   - Responsive <meta> tags
   - <title> based on the app’s purpose

2. Include all required CSS:
   - Inside a <style> block in <head> OR
   - Linked <link> if a CSS file is mentioned

3. Include all required JavaScript:
   - Inside <script> before </body> OR
   - External file if explicitly requested

4. App should:
   - Use semantic HTML tags (<main>, <section>, <header>, <button>, etc.)
   - Be responsive using Flexbox/Grid
   - Avoid unnecessary complexity
   - Follow basic accessibility (alt, aria-label, labels)

5. Use modern JavaScript (ES6+):
   - Use const/let, arrow functions, template literals
   - Avoid var, outdated patterns

Do NOT explain anything. Do NOT use triple backticks.
`;

async function generateresponseStream(userPrompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const fullPrompt = `${codeSystemPrompt}\n\nUser request:\n${userPrompt}`;

    const result = await model.generateContentStream(fullPrompt);
    return result;
  } catch (err) {
    console.error("🔥 Error in generateresponseStream():", err);
    throw err;
  }
}

module.exports = {
  promptimprover,
  generateresponseStream
};
