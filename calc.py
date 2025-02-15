import numpy as np
import json

def load_data(food_scores_file, recipes_file):
    with open(food_scores_file, 'r') as f:
        food_scores = json.load(f)
    with open(recipes_file, 'r') as f:
        recipes = json.load(f)
    return food_scores, recipes

def create_food_score_mapping(food_scores):
    food_score_map = {}
    poultry_score = None
    
    for item in food_scores:
        food_name = item["Food product"].lower()
        total_score = sum([item[k] for k in item if isinstance(item[k], (int, float))])
        print(item)
        
        if "poultry" in food_name:
            poultry_score = total_score
        food_score_map[food_name] = total_score
    
    if poultry_score:
        for poultry in ["chicken", "turkey", "duck"]:
            food_score_map[poultry] = poultry_score
    
    return food_score_map

def calculate_recipe_scores(recipes, food_score_map):
    recipe_scores = []
    for recipe in recipes:
        ingredients = recipe.get("ingredients", "").lower()
        total_score = sum([food_score_map[food] for food in food_score_map if food in ingredients])
        recipe_scores.append({"name": recipe["name"], "score": total_score})
    
    return recipe_scores

def main():
    food_scores_file = '/mnt/c/Users/adeoyo/Desktop/NSBE_HACK/hackathon/scores.json'
    recipes_file = '/mnt/c/Users/adeoyo/Desktop/NSBE_HACK/hackathon/openrecipes.json'   
    food_scores, recipes = load_data(food_scores_file, recipes_file)
    food_score_map = create_food_score_mapping(food_scores)
    recipe_scores = calculate_recipe_scores(recipes, food_score_map)
    
   # print(json.dumps(recipe_scores, indent=2))

if __name__ == "__main__":
    main()

