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

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const questions = [
    "What activities have you genuinely enjoyed?",
    "What made you feel energized, engaged, and excited?",
    "What are you naturally good at?",
    "What comes easily to you?",
    "What's important to you in life?",
    "What kind of impact do you want to make?"
];

async function generateResponse(answers) {
    console.log("Received answers:", answers);
    if (answers.length === 0) {
        return [
            { text: "Hello! I'm patocy AI. I'm here to help you with your future career. I determine your passion and the skillset by asking a few questions and suggest a suitable job role inside the IT industry.", nextQuestion: null },
            { text: "Let's start with the first question: What activities have you genuinely enjoyed?", nextQuestion: questions[0] }
        ];
    } else if (answers.length < questions.length) {
        const nextQuestion = questions[answers.length];
        return { text: `Great! Next question: ${nextQuestion}`, nextQuestion: nextQuestion };
    } else {
        // Process answers to suggest a job role
        // For simplicity, we're just returning a placeholder response here
        return { text: "Based on your answers, I suggest you look into a career in FrontEnd Development.", nextQuestion: null };
    }
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
