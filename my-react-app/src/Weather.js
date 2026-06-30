import React from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  let weatherData = {
    city: "Los Angeles",
    temperature: 22,
    date: "Monday 2:09 pm",
    description: "Cloudy",
    imgUrl: "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
    humidity: 65,
    wind: 3.6,
  };

  function handleResponse(response) {
    alert(
      `The weather in ${response.data.name} is ${response.data.main.temp}°C`,
    );
  }

  // let apiKey = "3a94f3778290bfeee6127850dbbe51d";
  //let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;

  //axios.get(apiURL).then(handleResponse);

  return (
    <div className="weather-app">
      <header>
        <form className="search-form" id="search-form">
          <input
            type="search"
            placeholder="Enter a city"
            required
            id="search-form-input"
            className="search-form-input"
          />

          <input type="submit" value="Search" className="search-form-button" />
        </form>
      </header>

      <main>
        <div className="weather-app-data">
          <div>
            <h1 className="weather-app-city">{weatherData.city}</h1>

            <p className="weather-app-details">
              {weatherData.date}, {weatherData.description}
              <br />
              Humidity:
              <strong> {weatherData.humidity}%</strong>, Wind:
              <strong> {weatherData.wind} km/h</strong>
            </p>
          </div>

          <div className="weather-app-temperature-container">
            <img src={weatherData.imgUrl} alt={weatherData.description} />

            <div className="weather-app-temperature">
              {weatherData.temperature}
            </div>

            <div className="weather-app-unit">°C</div>
          </div>
        </div>

        <WeatherForecast />
      </main>
    </div>
  );
}
