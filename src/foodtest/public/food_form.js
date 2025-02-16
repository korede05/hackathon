document.addEventListener('DOMContentLoaded', function() {
    const form = document.createElement('form');
    form.id = 'mealForm';

    // Number of meals
    const numMealsLabel = document.createElement('label');
    numMealsLabel.textContent = 'How many meals did you eat today? ';
    const numMealsInput = document.createElement('input');
    numMealsInput.type = 'number';
    numMealsInput.id = 'numMeals';
    numMealsInput.min = '0';
    form.appendChild(numMealsLabel);
    form.appendChild(numMealsInput);
    form.appendChild(document.createElement('br'));

    // Container for meal inputs
    const mealsContainer = document.createElement('div');
    mealsContainer.id = 'mealsContainer';
    form.appendChild(mealsContainer);

    // Submit button (initially hidden)
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.style.display = 'none';
    form.appendChild(submitButton);

    document.body.appendChild(form);

    let foodOptions = [
        'Beef', 'Lamb', 'Shellfish', 'Cheese', 'Fish', 'Pork', 'Chicken', 'Eggs', 
        'Rice', 'Grains', 'Milk', 'Tofu', 'Legumes', 'Bread', 'Pasta', 'Fruit', 
        'Vegetables', 'Nuts'
    ];

    // Show meal inputs when number of meals is entered
    numMealsInput.addEventListener('change', function() {
        const numMeals = parseInt(numMealsInput.value);
        mealsContainer.innerHTML = ''; // Clear previous meal inputs

        for (let i = 0; i < numMeals; i++) {
            const mealLabel = document.createElement('label');
            mealLabel.textContent = `Select foods for meal ${i + 1}: `;
            mealsContainer.appendChild(mealLabel);
            mealsContainer.appendChild(document.createElement('br'));

            foodOptions.forEach(food => {
                const checkboxContainer = document.createElement('div');
                checkboxContainer.style.display = 'flex';
                checkboxContainer.style.alignItems = 'center';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `meal${i + 1}-${food}`;
                checkbox.value = food;

                const label = document.createElement('label');
                label.textContent = food;
                label.setAttribute('for', checkbox.id); // Ensure 'for' attribute matches the checkbox id

                checkboxContainer.appendChild(checkbox);
                checkboxContainer.appendChild(label);
                mealsContainer.appendChild(checkboxContainer);
            });

            mealsContainer.appendChild(document.createElement('br'));
        }

        submitButton.style.display = numMeals > 0 ? 'inline' : 'none';
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const numMeals = parseInt(numMealsInput.value);
        const meals = [];

        for (let i = 0; i < numMeals; i++) {
            const selectedFoods = [];
            foodOptions.forEach(food => {
                const checkbox = document.getElementById(`meal${i + 1}-${food}`);
                if (checkbox && checkbox.checked) {
                    selectedFoods.push(food);
                }
            });
            meals.push(selectedFoods.join(', '));
        }

        const formData = {
            numMeals: numMeals,
            meals: meals
        };

        fetch('/save-meal-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Form data saved:', data);
        })
        .catch(error => {
            console.error('Error saving form data:', error);
        });
    });
});