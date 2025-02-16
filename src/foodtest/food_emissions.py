import matplotlib.pyplot as plt
import csv, requests, json, os



def add_data_to_dict(dict, data_file, food_type):
    with open(data_file, mode='r', encoding='utf-8-sig')  as cvs_file:
        cvs_dict = csv.DictReader(cvs_file)
        for row in cvs_dict:
            name  = row[food_type]
            dict[name] = row['Emissions']
    return dict

def get_emissions(emissions, food_types):
    return food_types*emissions


base_dir = os.path.dirname(__file__)
food_file = os.path.join(base_dir, 'Food.csv')
json_file = os.path.join(base_dir, 'mealData.json')
food_types = {}
total_emissions = 0

add_data_to_dict(food_types, food_file, 'Food Type')

with open(json_file, 'r', encoding='utf-8-sig') as json_file:
    json_data = json.load(json_file)
    
day_count = 1

for day in json_data:
    day_emissions = 0
    meals = []
    num_meals = day['numMeals']
    meal_foods = day['meals']
    for meal in meal_foods:
        meal = meal.split(', ')
        for food in meal:
            meals.append(food.title())
    
    for food in meals:
        total_emissions += int(food_types.get(food))
        day_emissions += int(food_types.get(food))


    average_emissions = day_emissions / num_meals
    print(f'Total emissions for day {day_count}: {day_emissions} g CO2e')
    print(f'Average emissions per meal: {average_emissions} g CO2e \n')
    day_count += 1

print(f'Total emissions for {day_count} days: {total_emissions} g CO2e')
with open('total_emissions.txt', 'w') as file:
    file.write(str(total_emissions))
print(f'Equivalent to driving {total_emissions/400} miles in a car')

#http://localhost:3000/food_form.html