import os
import json
import time
import csv
import requests
import threading
import matplotlib
import matplotlib.pyplot as plt
from flask import Flask, send_file
from flask_socketio import SocketIO

# Use non-interactive backend to avoid Tkinter issues
matplotlib.use("Agg")

# Flask setup
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# File paths
JSON_FILE = "/mnt/c/Users/adeoyo/Desktop/NSBE_HACK/hackathon/responses.json"
TOTAL_EMISSIONS_FILE = "total_emissions.txt"
STATIC_DIR = "static"  # Directory for saving the plot

# Ensure static directory exists
os.makedirs(STATIC_DIR, exist_ok=True)

# Google API Key
API_KEY = "AIzaSyBEPI6XdRhJcd_JYMUzaxEHs6kCPBPTJmE"

# CSV Files for emission data
LAND_FILE = "Land.csv"
AIR_FILE = "Air.csv"
SEA_FILE = "Sea.csv"

# Read emission data from CSV files
def add_data_to_dict(data_dict, file_path, transport_key):
    with open(file_path, mode="r", encoding="utf-8-sig") as csv_file:
        csv_dict = csv.DictReader(csv_file)
        for row in csv_dict:
            vehicle = row[transport_key]
            emissions = row["Emissions"]
            data_dict[vehicle] = float(emissions)
    return data_dict

# Load emissions data
land_trans_types = add_data_to_dict({}, LAND_FILE, "Land")
air_trans_types = add_data_to_dict({}, AIR_FILE, "Air")
sea_trans_types = add_data_to_dict({}, SEA_FILE, "Sea")

# Fetch distance from Google Maps API
def get_distance(origin, destination):
    url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={destination}&key={API_KEY}"
    response = requests.get(url).json()

    if response.get("status") != "OK":
        print(f"Error: {response.get('error_message')}")
        return 0

    distance_text = response["rows"][0]["elements"][0]["distance"]["text"]
    return float(distance_text.replace(" km", ""))

# Calculate emissions
def get_emissions(distance, emissions_per_gallon):
    return distance * emissions_per_gallon

# Process JSON and update emissions
def process_json_and_update_plot():
    """Reads JSON data, updates total emissions, and regenerates the plot."""
    try:
        # Read existing total emissions
        if os.path.exists(TOTAL_EMISSIONS_FILE):
            with open(TOTAL_EMISSIONS_FILE, "r") as file:
                try:
                    total_emissions = float(file.read().strip())
                except ValueError:
                    total_emissions = 0
        else:
            total_emissions = 0

        # Read JSON file for new emissions
        with open(JSON_FILE, "r") as file:
            form_data = json.load(file)

        print("Processing JSON Data:", form_data)

        # Calculate new emissions
        new_emissions = 0
        for entry in form_data:
            means = entry.get("mode", "").lower()
            transport_mech = entry.get("vehicle", "").title()
            origin = entry.get("from", "")
            destination = entry.get("to", "")

            if means == "land":
                emissions_per_gallon = land_trans_types.get(transport_mech, 0)
            elif means == "air":
                emissions_per_gallon = air_trans_types.get(transport_mech, 0)
            elif means == "sea":
                emissions_per_gallon = sea_trans_types.get(transport_mech, 0)
            else:
                print(f"Invalid transport means: {means}")
                continue

            distance = get_distance(origin, destination)
            emissions_from_trans = get_emissions(distance, emissions_per_gallon)
            new_emissions += emissions_from_trans

            print(f"Entry: {entry} | Distance: {distance} km | Emissions: {emissions_from_trans} g CO2")

        total_emissions += new_emissions  # Accumulate total emissions

        # Save updated emissions
        with open(TOTAL_EMISSIONS_FILE, "w") as file:
            file.write(str(total_emissions))

        # Generate new plot
        generate_plot(total_emissions)

        print(f"Updated Total Emissions: {total_emissions}")

    except Exception as e:
        print(f"Error processing JSON file: {e}")

# Generate and save plot
def generate_plot(total_emissions):
    """Generates emissions plot and saves it as an image."""
    try:
        emissions_week = [total_emissions * (i + 1) for i in range(7)]
        days_week = [f"Day {i+1}" for i in range(7)]

        # Plot emissions
        plt.figure(figsize=(8, 5))
        plt.plot(days_week, emissions_week, marker="o", linestyle="-", color="b")
        plt.title("Weekly Carbon Emissions")
        plt.xlabel("Days")
        plt.ylabel("Emissions (grams of CO2)")
        plt.xticks(rotation=45)

        # Save the plot
        plot_path = os.path.join(STATIC_DIR, "emissions_plot.png")
        plt.savefig(plot_path)
        plt.close()

    except Exception as e:
        print(f"Error generating plot: {e}")

# Flask routes
@app.route("/")
def home():
    """Home page that will display the latest emissions plot."""
    process_json_and_update_plot()  # Update data when the page is accessed
    return send_file(os.path.join(STATIC_DIR, "emissions_plot.png"), mimetype="image/png")

@app.route("/plot")
def plot():
    """Endpoint to return the latest emissions plot."""
    return send_file(os.path.join(STATIC_DIR, "emissions_plot.png"), mimetype="image/png")

# Run Flask
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=80000, debug=True, use_reloader=False)
