import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_KEY = 'AIzaSyBEPI6XdRhJcd_JYMUzaxEHs6kCPBPTJmE';

const fetchCSVData = async (filePath) => {
  const response = await fetch(filePath);
  const text = await response.text();
  return text.split('\n').map(row => {
    const cols = row.split(',');
    return { name: cols[0], emissions: cols[1] };
  });
};

const getDistance = async (origin, destination) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.status !== 'OK') {
      console.error('Google Maps API Error:', data.error_message || data.status);
      return 0;
    }
    return parseInt(data.rows[0].elements[0].distance.text.replace(' km', ''));
  } catch (error) {
    console.error('Failed to fetch distance:', error);
    return 0;
  }
};

const getEmissions = (distance, emissionsPerGallon) => {
  return distance * emissionsPerGallon;
};

const Emissions_Tracker = ({ newDataSubmitted }) => {
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // Fetch and process data
      const landData = await fetchCSVData('Land.csv');
      const airData = await fetchCSVData('Air.csv');
      const seaData = await fetchCSVData('Sea.csv');

      const formDataResponse = await fetch('http://localhost:5000/responses.json');
      const formData = await formDataResponse.json();

      let totalEmissions = 0;

      for (const entry of formData) {
        const means = entry.mode.toLowerCase();
        const transportMech = entry.vehicle;
        const origin = entry.from;
        const destination = entry.to;

        let emissionsPerGallon;

        if (means === 'land') {
          emissionsPerGallon = landData.find(item => item.name === transportMech)?.emissions;
        } else if (means === 'air') {
          emissionsPerGallon = airData.find(item => item.name === transportMech)?.emissions;
        } else if (means === 'sea') {
          emissionsPerGallon = seaData.find(item => item.name === transportMech)?.emissions;
        } else {
          console.error('Invalid transport means selected.');
          continue;
        }

        const distance = await getDistance(origin, destination);
        const emissionsFromTrans = getEmissions(distance, emissionsPerGallon);
        totalEmissions += emissionsFromTrans;
      }

      setTotalEmissions(totalEmissions);

      const emissionsYear = Array.from({ length: 10 }, (_, i) => totalEmissions * 365 * (i + 1));
      setYearlyData(emissionsYear);
    };

    loadData();
  }, [newDataSubmitted]);
  // Chart.js data format
  const chartData = {
    labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
    datasets: [
      {
        label: 'Total Emissions Over a Decade',
        data: yearlyData,
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h1>Emissions Tracker</h1>
      <p>Total Emissions: {totalEmissions}</p>

      <h2>Emissions Data Over Time</h2>
      <div>
        <h3>Yearly Emissions</h3>
        <Line data={chartData} />
      </div>
      {/* Add additional charts here */}
    </div>
  );
};

export default Emissions_Tracker;