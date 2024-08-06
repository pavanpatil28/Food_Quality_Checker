const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/api/receive-text', require('./api/receive-text'));

// Start the server
app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
