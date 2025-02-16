import React, { useState, useEffect } from 'react';

function EmissionsPlot() {
    const [plotUrl, setPlotUrl] = useState('');

    useEffect(() => {
        // Fetch the plot image from the Flask server
        fetch('http://localhost:5500/plot')
            .then(response => response.blob())
            .then(imageBlob => {
                // Create a URL for the image blob
                const imageUrl = URL.createObjectURL(imageBlob);
                setPlotUrl(imageUrl);
            })
            .catch(error => console.error('Error fetching plot:', error));
    }, []);

    return (
        <div>
            <h1>Weekly Carbon Emissions</h1>
            {plotUrl ? <img src={plotUrl} alt="Emissions Plot" /> : <p>Loading plot...</p>}
        </div>
    );
}

export default EmissionsPlot;
