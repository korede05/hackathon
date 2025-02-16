import React, { useState, useEffect } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import "../styles/form.css"

const Vehicle_Form = () => {
  const [mode, setMode] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [showVehicleSelect, setShowVehicleSelect] = useState(false);
  const [showLocationInputs, setShowLocationInputs] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (mode) {
      fetchVehicleOptions(mode);
    } else {
      setVehicleOptions([]);
    }
  }, [mode]);

  const fetchVehicleOptions = (mode) => {
    fetch(`/${mode}.csv`)
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n').map(row => row.trim()).filter(row => row !== '');
        const options = rows.slice(1).map(row => row.split(',')[0]);
        setVehicleOptions(options);
      })
      .catch((error) =>
        console.error(`Error loading ${mode} vehicle options:`, error)
      );
  };

  const handleModeChange = (e) => {
    if (isSubmitted) return;
    setMode(e.target.value);
    setVehicle('');
    setShowVehicleSelect(e.target.value !== '');
    setShowLocationInputs(false);
  };

  const handleVehicleChange = (e) => {
    if (isSubmitted) return;
    setVehicle(e.target.value);
    setShowLocationInputs(e.target.value !== '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mode || !vehicle || !from || !to || !date) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const formData = { mode, vehicle, from, to, date };

    fetch('http://localhost:5000/save-form-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Form data saved:', data);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error('Error saving form data:', error);
        alert("Error submitting form. Please try again.");
      });
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="submission-window">
          <h2>Form Submitted Successfully!</h2>
          <p>Refresh the page to submit another response.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      ) : (
        <form id="transportForm" onSubmit={handleSubmit}>
          <label htmlFor="mode">Mode of Transportation:</label>
          <select id="mode" value={mode} onChange={handleModeChange} disabled={isSubmitted}>
            <option value="">Select</option>
            <option value="land">Land</option>
            <option value="air">Air</option>
            <option value="sea">Sea</option>
          </select>

          {showVehicleSelect && (
            <>
              <label htmlFor="vehicle">Vehicle Type:</label>
              <select id="vehicle" value={vehicle} onChange={handleVehicleChange} disabled={isSubmitted}>
                <option value="">Select</option>
                {vehicleOptions.map((option, index) => (
                  <option key={index} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            </>
          )}

          {showLocationInputs && (
            <>
              <PlacesAutocomplete value={from} onChange={setFrom} onSelect={setFrom}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <label htmlFor="from">Traveling From:</label>
                    <input id="from" {...getInputProps({ placeholder: 'Enter origin address' })} disabled={isSubmitted} />
                    <div>
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const style = { backgroundColor: suggestion.active ? "#fafafa" : "#ffffff", cursor: "pointer", padding: "5px" };
                        return (
                          <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>

              <PlacesAutocomplete value={to} onChange={setTo} onSelect={setTo}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <label htmlFor="to">Traveling To:</label>
                    <input id="to" {...getInputProps({ placeholder: 'Enter destination address' })} disabled={isSubmitted} />
                    <div>
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const style = { backgroundColor: suggestion.active ? "#fafafa" : "#ffffff", cursor: "pointer", padding: "5px" };
                        return (
                          <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>

              {/* 🚀 NEW DATE INPUT */}
              <label htmlFor="date">Travel Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isSubmitted}
                required
              />

              <button type="submit" disabled={isSubmitted}>Submit</button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default Vehicle_Form;
