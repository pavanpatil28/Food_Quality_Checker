const express = require('express');
const cors = require('cors');
const { run } = require('./gemini');
const path = require('path');
const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/receive-text', async (req, res) => {
    const { text } = req.body;
    console.log('Received text:', text);

    try {
        // Send text to Gemini API for evaluation
        const evaluation = await run(text);

        // Respond with the evaluation result
        res.json({ evaluation });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while evaluating the text.' });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});