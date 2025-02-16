import matplotlib
matplotlib.use("TkAgg")  # Use the Tkinter backend for interactive plotting
import matplotlib.pyplot as plt
import tkinter as tk
import csv, requests, json

API_KEY = 'AIzaSyBEPI6XdRhJcd_JYMUzaxEHs6kCPBPTJmE'

def add_data_to_dict(dict, data_file, transport_means):
    with open(data_file, mode='r', encoding='utf-8-sig')  as cvs_file:
        cvs_dict = csv.DictReader(cvs_file)
        for row in cvs_dict:
            name  = row[transport_means]
            dict[name] = row['Emissions']
    return dict



def get_distance(origin, destination):
    url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'

    r = requests.get(url + 'origins=' + origin +
                    '&destinations=' + destination +
                    '&key=' + API_KEY)
    x = r.json()

    if x.get('status') != 'OK':
        print(f"Error: {x.get('error_message')}")
    else:
        distance = (x['rows'][0]['elements'][0]['distance']['text']).replace(' km','')
    
        
    return float(distance)
    
def get_emissions(distance, emissions_per_gallon):
    return distance*emissions_per_gallon

land_file = 'Land.csv'
air_file = 'Air.csv'
sea_file = 'Sea.csv'

land_trans_types = {}
air_trans_types = {}
sea_trans_types = {}

add_data_to_dict(land_trans_types, land_file, 'Land')
add_data_to_dict(air_trans_types, air_file, 'Air')
add_data_to_dict(sea_trans_types, sea_file, 'Sea')

total_emissions = 0
with open('/mnt/c/Users/adeoyo/Desktop/NSBE_HACK/hackathon/responses.json', 'r') as file:
    form_data = json.load(file)
for entry in form_data:
    means = entry['mode']
    transport_mech = entry['vehicle']
    origin = entry['from']
    destination = entry['to']

    if means.lower() == 'land':
            emissions_per_gallon = int(land_trans_types[transport_mech.title()])
    elif means.lower() == 'air':
            emissions_per_gallon = int(air_trans_types[transport_mech.title()])
    elif means.lower() == 'sea':
            emissions_per_gallon = int(sea_file[transport_mech.title()])
    else:
            print("Invalid transport means selected.")
            

    distance = get_distance(origin, destination)

    emissions_from_trans = get_emissions(distance, emissions_per_gallon)
    total_emissions += emissions_from_trans
    print('Your total amount of Carbon Emissions from {} is {} grams of CO2'.format(means,emissions_from_trans))

print('Total Emissions: {}'.format(total_emissions))

# Generate data points for a week
emissions_week = [total_emissions * (i + 1) for i in range(7)]
days_week = ['Day {}'.format(i + 1) for i in range(7)]

# Generate data points for a month and a year
emissions_month = [total_emissions * (i + 1) for i in range(30)]
days_month = ['Day {}'.format(i + 1) for i in range(30)]

# Generate data points for a decade
emissions_decade = [total_emissions * 365 * (i + 1) for i in range(10)]
years_decade = ['Year {}'.format(i + 1) for i in range(10)]

# Plot the graphs
fig, axs = plt.subplots(3, 1, figsize=(10, 15))

# Weekly emissions plot
axs[0].plot(days_week, emissions_week, marker='o', linestyle='-', color='b')
axs[0].set_title('Weekly Carbon Emissions')
axs[0].set_xlabel('Days')
axs[0].set_ylabel('Emissions (grams of CO2)')
axs[0].tick_params(axis='x', rotation=45)

# Monthly emissions plot
axs[1].plot(days_month, emissions_month, marker='s', linestyle='-', color='g')
axs[1].set_title('Monthly Carbon Emissions')
axs[1].set_xlabel('Days')
axs[1].set_ylabel('Emissions (grams of CO2)')
axs[1].tick_params(axis='x', rotation=45)

# Decade emissions plot
axs[2].plot(years_decade, emissions_decade, marker='^', linestyle='-', color='r')
axs[2].set_title('Yearly Carbon Emissions Over a Decade')
axs[2].set_xlabel('Years')
axs[2].set_ylabel('Emissions (grams of CO2)')
axs[2].tick_params(axis='x', rotation=45)

# Adjust layout and show plot
plt.ion()  # Turn on interactive mode
plt.show()
input("Press Enter to exit...")



with open('total_emissions.txt', 'w') as file:
    file.write(str(total_emissions))



# Plotting the third graph for a decade






# data if we continue weekly

# data if we continue monthly 

# data if we reduce our number of outputs suggestions

# do you want to learn about more about how to cut down on emission 

# data if we reduce our number of outputs suggestions

# http://localhost:3000/emissions_form.html







