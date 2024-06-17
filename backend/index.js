const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { host, username, password, database, Backend_API_KEY } = require('./config');
const app = express(); // create express app
require('dotenv').config(); // enable dotenv
const PORT = 3000; // server port

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable express json parser

// create connection to database
const db = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database,
});

// connect to database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

// Create the table if not exists
// change the table name (Locations) if you want to
db.query(`
    CREATE TABLE IF NOT EXISTS locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    whatItDo VARCHAR(255),
    navigationHelp VARCHAR(255),
    image VARCHAR(255),
    latitude DOUBLE,
    longitude DOUBLE
    );
`, (error, results) => {
    if (error) {
        console.error('Error creating table:', error.stack);
        return;
    }
    console.log('Table created or already exists');
});

// Middleware to check API key
const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['api-key'];

    // Replace 'YOUR_API_KEY' with the actual API key generated for your clients
    if (apiKey && apiKey === Backend_API_KEY) {
        next(); // API key is valid, continue with the request
    } else {
        res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
    }
};

// Use the middleware for all API endpoints
app.use('/api', checkApiKey);

// endpoint to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello, this is ouslMap backend!');
});

// endpoint to add data to the database
app.post('/api/add-locations', (req, res) => {
    const { id, title, whatItDo, navigationHelp, image, latitude, longitude } = req.body;
    // change the table name (Locations) arcording to your table name
    db.query(
        'INSERT INTO locations (id, title, whatItDo, navigationHelp, image, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id, title, whatItDo, navigationHelp, image, latitude, longitude],
        (error, results) => {
            if (error) {
                console.error('Error executing query:', error.stack);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).json({ message: 'Location added successfully' });
        }
    );
});

// endpoint to fetch data from the database
app.get('/api/locations', (req, res) => {
    // change the table name (Locations) arcording to your table name
    db.query('SELECT * FROM locations', (error, results) => {
        if (error) {
            console.error('Error executing query:', error.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

app.delete('/api/delete-locations/:id', (req, res) => {
    const id = req.params.id;
    // change the table name (Locations) according to your table name
    db.query('DELETE FROM locations WHERE id = ?', id, (error, results) => {
        if (error) {
            console.error('Error executing query:', error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ message: 'Location deleted successfully!' });
    });
});

// listen on port 3000 or server port
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

exports.app = app;