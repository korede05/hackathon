const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/save-meal-data', (req, res) => {
    const formData = req.body;

    // Define the path to the JSON file
    const filePath = path.join(__dirname, 'mealData.json');

    // Read the existing data from the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        let jsonData = [];
        if (data) {
            jsonData = JSON.parse(data);
        }

        // Add the new form data to the existing data
        jsonData.push(formData);

        // Write the updated data back to the JSON file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json({ message: 'Form data saved successfully' });
        });
    });
});

app.get('/food-options', (req, res) => {
    const foodFilePath = path.join(__dirname, 'Food.csv');
    const foodOptions = [];
    const key = 'Food Type';

    fs.createReadStream(foodFilePath)
        .pipe(csv())
        .on('data', (row) => {
            console.log(row[key]); // Log each row to check the keys
            foodOptions.push(row['Food Type']);
        })
        .on('end', () => {
            console.log(foodOptions); // Log the food options to the console
            res.json(foodOptions);
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});