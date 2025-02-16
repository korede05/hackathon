

document.addEventListener('DOMContentLoaded', function() {
    const form = document.createElement('form');
    form.id = 'transportForm';

    // Mode of transportation
    const modeLabel = document.createElement('label');
    modeLabel.textContent = 'Mode of Transportation: ';
    const modeSelect = document.createElement('select');
    modeSelect.id = 'mode';
    const defaultModeOption = document.createElement('option');
    defaultModeOption.value = '';
    defaultModeOption.textContent = 'Select';
    modeSelect.appendChild(defaultModeOption);
    ['Land', 'Air', 'Sea'].forEach(mode => {
        const option = document.createElement('option');
        option.value = mode.toLowerCase();
        option.textContent = mode;
        modeSelect.appendChild(option);
    });
    form.appendChild(modeLabel);
    form.appendChild(modeSelect);
    form.appendChild(document.createElement('br'));

    // Vehicle type (initially hidden)
    const vehicleLabel = document.createElement('label');
    vehicleLabel.textContent = 'Vehicle Type: ';
    vehicleLabel.style.display = 'none';
    const vehicleSelect = document.createElement('select');
    vehicleSelect.id = 'vehicle';
    vehicleSelect.style.display = 'none';
    const defaultVehicleOption = document.createElement('option');
    defaultVehicleOption.value = '';
    defaultVehicleOption.textContent = 'Select';
    vehicleSelect.appendChild(defaultVehicleOption);
    form.appendChild(vehicleLabel);
    form.appendChild(vehicleSelect);
    form.appendChild(document.createElement('br'));

    // Traveling from and to (initially hidden)
    const fromLabel = document.createElement('label');
    fromLabel.textContent = 'Traveling From: ';
    fromLabel.style.display = 'none';
    const fromInput = document.createElement('input');
    fromInput.type = 'text';
    fromInput.id = 'from';
    fromInput.style.display = 'none';
    form.appendChild(fromLabel);
    form.appendChild(fromInput);
    form.appendChild(document.createElement('br'));

    const toLabel = document.createElement('label');
    toLabel.textContent = 'Traveling To: ';
    toLabel.style.display = 'none';
    const toInput = document.createElement('input');
    toInput.type = 'text';
    toInput.id = 'to';
    toInput.style.display = 'none';
    form.appendChild(toLabel);
    form.appendChild(toInput);
    form.appendChild(document.createElement('br'));

    // Submit button (initially hidden)
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.style.display = 'none';
    form.appendChild(submitButton);

    document.body.appendChild(form);

    // Function to update vehicle options based on mode
    function updateVehicleOptions(mode) {
        const vehicleOptions = {
            land: [],
            air: [],
            sea: []
        };

        // Fetch vehicle options from CSV based on mode
        const csvFile = `${mode}.csv`;
        fetch(csvFile)
            .then(response => response.text())
            .then(data => {
                const rows = data.split('\n');
                rows.forEach((row, index) => {
                    if (index > 0) { // Skip the first option
                        const vehicle = row.replace(/\d+/g, '').replace(/,/g, '').trim(); // Remove numbers, commas, and trim whitespace
                        if (vehicle) {
                            vehicleOptions[mode].push(vehicle);
                        }
                    }
                });
                populateVehicleOptions(vehicleOptions[mode]);
            })
            .catch(error => {
                console.error(`Error loading ${mode} vehicle options:`, error);
            });
    }

    // Function to populate vehicle options in the select element
    function populateVehicleOptions(options) {
        // Clear existing options
        vehicleSelect.innerHTML = '';

        // Add default "Select" option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select';
        vehicleSelect.appendChild(defaultOption);

        // Add new options
        options.forEach(vehicle => {
            const option = document.createElement('option');
            option.value = vehicle.toLowerCase().replace(' ', '_');
            option.textContent = vehicle;
            vehicleSelect.appendChild(option);
        });
    }

    // Show vehicle type when mode is selected
    modeSelect.addEventListener('change', function() {
        if (this.value) {
            updateVehicleOptions(this.value);
            vehicleLabel.style.display = 'inline';
            vehicleSelect.style.display = 'inline';
        } else {
            vehicleLabel.style.display = 'none';
            vehicleSelect.style.display = 'none';
            fromLabel.style.display = 'none';
            fromInput.style.display = 'none';
            toLabel.style.display = 'none';
            toInput.style.display = 'none';
            submitButton.style.display = 'none';
        }
    });

    // Show traveling from and to when vehicle type is selected
    vehicleSelect.addEventListener('change', function() {
        if (this.value) {
            fromLabel.style.display = 'inline';
            fromInput.style.display = 'inline';
            toLabel.style.display = 'inline';
            toInput.style.display = 'inline';
            submitButton.style.display = 'inline';
        } else {
            fromLabel.style.display = 'none';
            fromInput.style.display = 'none';
            toLabel.style.display = 'none';
            toInput.style.display = 'none';
            submitButton.style.display = 'none';
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            mode: modeSelect.value,
            vehicle: vehicleSelect.value,
            from: fromInput.value,
            to: toInput.value
        };

        fetch('/save-form-data', {
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

