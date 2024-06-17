const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express(); // create express app
const PORT = 3000; // server port

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable express json parser

// get Supabase URL and key from .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const Backend_API_KEY = process.env.BACKEND_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
// get GeminiAPI key from .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to generate story
async function generateStory() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Write a story about a magic backpack."

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
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

// endpoint to add data to the database
app.post('/api/add-locations', async (req, res) => {
    const { title, whatItDo, navigationHelp, image, latitude, longitude } = req.body;

    try {
        const { data, error } = await supabase
            .from('locations')
            .insert([{ title, whatItDo, navigationHelp, image, latitude, longitude }]);

        if (error) {
            throw error;
        }

        res.status(200).json({ message: 'Location added successfully', data });
    } catch (error) {
        console.error('Error adding location:', error);
        res.status(500).send('Internal Server Error');
    }
});

// endpoint to fetch data from the database
app.get('/jobRoles', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('jobRoles')
            .select('*')
        if (error) {
            throw error;
        }
        res.status(200).json(data);

    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).send('Internal Server Error');
    }
});

// endpoint to delete a location by ID
app.delete('/api/delete-locations/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('locations')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        res.status(200).json({ message: 'Location deleted successfully!', data });
    } catch (error) {
        console.error('Error deleting location:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// endpoint to call the run function
app.get('/generate-story', async (req, res) => {
    try {
        const story = await generateStory();
        res.status(200).json({ story });
    } catch (error) {
        console.error('Error generating story:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// listen on port 3000 or server port
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on localhost port ${PORT}`);
});

exports.app = app;
