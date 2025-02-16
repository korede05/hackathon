const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/save-form-data', (req, res) => {
    const formData = req.body;
    const filePath = path.join(__dirname, 'form_data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading form data:', err);
            return res.status(500).json({ error: 'Failed to read form data' });
        }

        let existingData = [];
        if (data) {
            try {
                existingData = JSON.parse(data);
                if (!Array.isArray(existingData)) {
                    existingData = [];
                }
            } catch (e) {
                console.error('Error parsing form data:', e);
                return res.status(500).json({ error: 'Failed to parse form data' });
            }
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