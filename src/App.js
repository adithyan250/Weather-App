import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

const Body = () => {

    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");

    const handlechange = (event) => {
        setCity(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setWeatherData(null);

        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=afa7f9f33a797c8ec5d39effe7144b6a`);
            setWeatherData(response.data);
            console.log(weatherData)
            
        }catch(error){
            if(city==""){
                setError("Please enter a city name");
            }else{
                setError("City not found");
            }
        }
    }

  return (
    <div className="weather-search-container">
      <h1 className="heading-main">weather App</h1>
      <form id="weatherForm" onSubmit={handleSubmit}>
        <input type="text" id="cityInput" value={city} onChange={handlechange} placeholder="Enter City Name" />
        <button type="submit">Search</button>
      </form>
      <div id="error" className="error"></div>
      <div id="weatherResult" className="weather-result"></div>
      <div className="message">
        {error && <p className="error">{error}</p>}
        {weatherData && (
            <div className="weather-result">
                <h2>{weatherData?.name}</h2>
                <p>Temperature: {(parseInt(weatherData?.main?.temp) - 273.15).toFixed(1)}°c</p>
                <p>Weather: {weatherData?.weather[0].description}</p>
                <p>Country:{weatherData?.sys?.country}</p>
            </div>
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Body/>);
