const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow only your frontend origin
    methods: ['GET', 'POST'], // Allow the necessary methods
    allowedHeaders: ['Content-Type'] // You can specify headers if needed
  })); // Enable CORS for all routes

// File path for responses.json
const filePath = path.join(__dirname, 'responses.json');

// Ensure responses.json exists
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf8'); // Creates an empty JSON array if the file doesn't exist
}

// Save form data to responses.json
app.post('/save-form-data', (req, res) => {
    const formData = req.body;
    console.log('Received form data:', formData)

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading form data:', err);
            return res.status(500).json({ error: 'Failed to read form data' });
        }

        let existingData = [];
        try {
            existingData = JSON.parse(data);
            if (!Array.isArray(existingData)) {
                existingData = [];
            }
        } catch (e) {
            console.error('Error parsing form data:', e);
            return res.status(500).json({ error: 'Failed to parse form data' });
        }

        existingData.push(formData);

        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error('Error saving form data:', err);
                return res.status(500).json({ error: 'Failed to save form data' });
            }

            res.json({ message: 'Form data saved successfully' });
        });
    });
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});