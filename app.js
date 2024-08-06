const express = require('express');
const cors = require('cors');
const { run } = require('./gemini');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Configure CORS
app.use(cors({
    origin: 'https://food-quality-checker.vercel.app', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'] // Allow specific headers
}));

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
