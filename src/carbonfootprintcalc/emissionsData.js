const fs = require('fs');
const { createCanvas } = require('canvas');
const { Chart, registerables } = require('chart.js');

// Register the necessary components
Chart.register(...registerables);

// Read total emissions from a text file and convert it to a number
const totalEmissions = Number(fs.readFileSync('total_emissions.txt', 'utf8').trim());

// Generate data points for a week
const emissionsWeek = Array.from({ length: 7 }, (_, i) => totalEmissions * (i + 1));
const daysWeek = Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`);

// Generate data points for a month
const emissionsMonth = Array.from({ length: 30 }, (_, i) => totalEmissions * (i + 1));
const daysMonth = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

// Generate data points for a decade
const emissionsDecade = Array.from({ length: 10 }, (_, i) => totalEmissions * 365 * (i + 1));
const yearsDecade = Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`);

console.log('Emissions for a week:', emissionsWeek);
console.log('Days of the week:', daysWeek);
console.log('Emissions for a month:', emissionsMonth);
console.log('Days of the month:', daysMonth);
console.log('Emissions for a decade:', emissionsDecade);
console.log('Years of the decade:', yearsDecade);

// Function to create a chart
const createChart = async (labels, data, title, filename) => {
    const width = 800;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const configuration = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Emissions'
                    },
                    beginAtZero: true
                }
            }
        }
    };

    new Chart(ctx, configuration);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filename, buffer);
};

// Create charts
createChart(daysWeek, emissionsWeek, 'Emissions for a Week', 'emissions_week.png');
createChart(daysMonth, emissionsMonth, 'Emissions for a Month', 'emissions_month.png');
createChart(yearsDecade, emissionsDecade, 'Emissions for a Decade', 'emissions_decade.png');