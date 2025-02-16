import json
import time

def load_data(food_scores_file, recipes_file):
    print("Loading data...")
    with open(food_scores_file, 'r') as f:
        food_scores = json.load(f)
    with open(recipes_file, 'r') as f:
        recipes = json.load(f)
    print(f"Loaded {len(food_scores)} food scores and {len(recipes)} recipes.")
    return food_scores, recipes

def create_food_score_mapping(food_scores):
    print("Creating food score mapping...")
    food_score_map = {}
    poultry_score = None
    
    for item in food_scores:
        food_name = item["Food product"].lower()
        total_score = sum([item[k] for k in item if isinstance(item[k], (int, float))])
        
        if "poultry" in food_name:
            poultry_score = total_score
        food_score_map[food_name] = total_score
    
    if poultry_score:
        for poultry in ["chicken", "turkey", "duck"]:
            food_score_map[poultry] = poultry_score
    
    print(f"Created food score mapping with {len(food_score_map)} items.")
    return food_score_map

def calculate_recipe_scores(recipes, food_score_map):
    print("Calculating recipe scores...")
    recipe_scores = []
    
    # Start timing for recipe processing
    start_time = time.time()
    
    for recipe in recipes:
        ingredients = recipe.get("ingredients", "").capitalize()
        
        # Split ingredients by " and " and commas
        ingredient_list = [ingredient.strip() for ingredient in ingredients.replace(" and ", ", ").split(",")]
        
        # Calculate the total score for the recipe
        total_score = 0
        for ingredient in ingredient_list:
            # Check if any food item is a substring of the ingredient using .find()
            for food in food_score_map:
                if ingredient.find(food) != -1:  # Partial match found
                    total_score += food_score_map[food]
                    break  # Avoid double-counting if multiple foods match
        if total_score >0:
            recipe_scores.append({
                "name": recipe["name"],
                "ingredients": recipe["ingredients"],  # Include original ingredients
                "sustainability_score": total_score,
                "description": recipe.get("description", ""),
                "url": recipe.get("url", ""),
                "image": recipe.get("image", "")
            })
    
    # End timing for recipe processing
    end_time = time.time()
    print(f"Finished processing {len(recipes)} recipes in {end_time - start_time:.2f} seconds.")
    
    return recipe_scores

def main():
    # Start timing for the entire program
    total_start_time = time.time()
    
    food_scores_file = '/mnt/c/Users/adeoyo/Desktop/NSBE_HACK/hackathon/scores.json'
    recipes_file = '/mnt/c/Users/adeoyo/Desktop/NSBE_HACK/hackathon/openrecipes.json'   
    output_file = '/mnt/c/Users/adeoyo/Desktop/NSBE_HACK/hackathon/public/recipesscores.json'
    
    # Load data
    food_scores, recipes = load_data(food_scores_file, recipes_file)
    
    # Create food score mapping
    food_score_map = create_food_score_mapping(food_scores)
    
    # Calculate recipe scores
    recipe_scores = calculate_recipe_scores(recipes, food_score_map)
    
    # Save results to file
    print(f"Saving results to {output_file}...")
    with open(output_file, 'w') as f:
        json.dump(recipe_scores, f, indent=2)
    
    # End timing for the entire program
    total_end_time = time.time()
    print(f"Total execution time: {total_end_time - total_start_time:.2f} seconds.")

if __name__ == "__main__":
    main()