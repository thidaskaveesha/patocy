const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express(); // create express app
const PORT = 3000; // server port

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable express json parser

// get Supabase URL and key from .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const Backend_API_KEY = process.env.BACKEND_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const {
    GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

async function generateToprompt(prompt) {
    // Choose a model that's appropriate for your use case.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text(); // Ensure to await the response.text() promise
    console.log(text);
    return text; // Return the generated text
}


const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const questions = [
    "Do you enjoy designing and creating things, such as art, music, or writing? How do you express your creativity in daily life?",
    "Have you ever built a website, designed a game, or created any digital art? What did you enjoy most about the process?",
    "When you think about working in IT, are you more excited about designing user interfaces or coming up with innovative features for software applications?",
    "Do you find satisfaction in making visually appealing presentations, graphics, or videos?",
    "How do you approach a project that requires a lot of creativity? Can you describe your process?",
    "Do you enjoy solving puzzles, playing strategy games, or working on math problems? What about these activities do you find fulfilling?",
    "Can you describe a situation where you identified a problem and developed a solution for it? What steps did you take?",
    "When faced with a challenging technical issue, how do you typically approach finding a solution?",
    "Do you prefer tasks that require logical thinking and detailed analysis? Can you provide an example of such a task you enjoyed?",
    "How do you handle troubleshooting and debugging issues in technology? Do you find the process rewarding?",
    "Can you recall a project where you had to use both creative and analytical skills? What was the project, and how did you balance both aspects?",
    "Do you enjoy brainstorming new ideas and then figuring out how to implement them technically? Can you provide an example?",
    "How do you feel about improving or optimizing existing systems? Do you enjoy finding innovative ways to enhance performance?",
    "Have you ever been involved in a project that required collaboration between designers and developers? What role did you play?",
    "Do you like to prototype and test new concepts, whether in software or hardware? What do you enjoy about this process?",
    "What kind of tasks do you lose track of time doing? Are they more creative or analytical?",
    "Do you prefer working on projects that have a clear end goal or those that allow for a lot of exploration and experimentation?",
    "What motivates you more: creating something new and innovative or improving something that already exists?",
    "How do you feel about working with data and using it to drive decisions? Do you enjoy identifying patterns and insights from data?",
    "Are you interested in learning about user experience (UX) design, or do you find backend development more appealing? Why?",
    "Think about any past projects or activities, whether in school, work, or hobbies. Which ones did you enjoy the most and why?",
    "Do you have any experience with coding or programming? What did you find most interesting or challenging about it?",
    "Have you ever participated in a hackathon, coding bootcamp, or similar event? What did you enjoy or learn from the experience?",
    "What kind of IT-related content do you enjoy consuming (e.g., blogs, podcasts, videos)? Are they more focused on creative or technical topics?"
];

async function generateResponse(answers) {
    console.log("Received answers:", answers);
    if (answers.length === 0) {
        return [
            { text: "Hello! I'm patocy AI. I'm here to help you with your future career. I determine your passion and the skillset by asking a few questions and suggest a suitable job role inside the IT industry.", nextQuestion: null },
            { text: "What inspired you to pursue a career in the IT industry?", nextQuestion: questions[0] }
        ];
    } else if (answers.length < questions.length) {
        const nextQuestion = questions[answers.length];
        return { text: `${nextQuestion}`, nextQuestion: nextQuestion };
    } else {
        // Process answers to suggest a job role
        const prompt = `suggest a jobrole in IT industry based on the answers: ${answers} these answers is based on these questions: ${questions} please only return Based on your answers, I suggest you look into a career in and the job Role you gonna suggest. dont give any other text and if user's answer is not related to the question please ignore it. and return that you can't suggest a job role based on the answers.`
        const jobRole = await generateToprompt(prompt); // Call the function to generate the response
        console.log("Job Role:", jobRole);
        return { text: `${jobRole}.`, nextQuestion: null, jobRole: jobRole };
    };
}


// Middleware to check API key
const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['api-key'];

    if (apiKey && apiKey === Backend_API_KEY) {
        next(); // API key is valid, continue with the request
    } else {
        res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
    }
};

// endpoint to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello, this is patocy backend!');
});

// Use the middleware for all API endpoints
app.use('/api', checkApiKey);

// endpoint to fetch data from the database
app.get('/jobRoles', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('jobRoles')
            .select('*');
        if (error) {
            throw error;
        }
        res.status(200).json(data);

    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).send('Internal Server Error');
    }
});

// endpoint to call the generateResponse function
app.post('/questions', async (req, res) => {
    const { answers } = req.body;

    try {
        console.log("Request body:", req.body);
        const response = await generateResponse(answers);
        console.log("Generated response:", response);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// listen on port 3000 or server port
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on localhost port ${PORT}`);
});

exports.app = app;
