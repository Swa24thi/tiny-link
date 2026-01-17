const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serves the frontend files

// "Database" in memory
const urlDatabase = {};

// 1. Route to create a short URL
app.post('/shorten', (req, res) => {
    const longUrl = req.body.url;
    // Generates a random 6-character ID
    const shortId = Math.random().toString(36).substring(2, 8);
    
    // Save to our "database"
    urlDatabase[shortId] = longUrl;
    
    res.json({ shortUrl: `http://localhost:${PORT}/${shortId}` });
});

// 2. Route to redirect to the original URL
app.get('/:id', (req, res) => {
    const longUrl = urlDatabase[req.params.id];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});