import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import "./Weather.css";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function updateCity(event) {
    setCity(event.target.value);
  }

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      coordinates: response.data.coord,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`,
      description: response.data.weather[0].description,
    });
  }

  function search(city) {
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search(city);
  }

  useEffect(() => {
    search("Los Angeles");
  }, []);

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div className="weather-app">
        {form}

        <div className="weather-app-data">
          <div>
            <h1>{weather.city}</h1>
            <p>{weather.description}</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.wind} km/h</p>
            <p>Temperature: {Math.round(weather.temperature)}°C</p>
            <img src={weather.icon} alt={weather.description} />
          </div>
        </div>

        <WeatherForecast coordinates={weather.coordinates} />
      </div>
    );
  } else {
    return <div className="weather-app">Loading...</div>;
  }
}
