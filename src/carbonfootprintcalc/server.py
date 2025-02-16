import os
import json
import time
import base64
import threading
import matplotlib.pyplot as plt
from flask import Flask, send_file, url_for
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

TOTAL_EMISSIONS_FILE = "total_emissions.txt"
STATIC_DIR = "static"  # Directory for saving the plot

# Ensure the static directory exists
if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR)

def generate_plot():
    """Reads data, generates emissions plots, and saves it."""
    try:
        # Read the total emissions from the text file
        with open(TOTAL_EMISSIONS_FILE, 'r') as file:
            total_emissions = float(file.read().strip())  # Read the total emissions value
        
        # Generate data points
        emissions_week = [total_emissions * (i + 1) for i in range(7)]
        days_week = ['Day {}'.format(i + 1) for i in range(7)]

        # Plot emissions
        plt.figure(figsize=(8, 5))
        plt.plot(days_week, emissions_week, marker='o', linestyle='-', color='b')
        plt.title('Weekly Carbon Emissions')
        plt.xlabel('Days')
        plt.ylabel('Emissions (grams of CO2)')
        plt.xticks(rotation=45)

        # Save the plot to a file in the static directory
        plot_path = os.path.join(STATIC_DIR, "emissions_plot.png")
        plt.savefig(plot_path)
        plt.close()
        
    except Exception as e:
        print(f"Error reading or processing {TOTAL_EMISSIONS_FILE}: {e}")

@app.route('/')
def home():
    """Home page that will display the latest emissions plot."""
    # Generate the plot when the page is accessed
    generate_plot()

    # Serve the plot using Flask's static file handling
    return send_file(os.path.join(STATIC_DIR, "emissions_plot.png"), mimetype="image/png")

@app.route('/plot')
def plot():
    """Endpoint to return the latest plot."""
    # Serve the plot file directly
    return send_file(os.path.join(STATIC_DIR, "emissions_plot.png"), mimetype="image/png")

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5500, debug=True)
