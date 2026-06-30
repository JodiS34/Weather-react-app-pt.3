import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

const defaults = {
  icon: "CLEAR_DAY",
  color: "#212121",
  size: 38,
  animate: true,
};

function showIcon(condition) {
  switch (condition) {
    case "Clear":
      return "CLEAR_DAY";
    case "Clouds":
      return "CLOUDY";
    case "Rain":
      return "RAIN";
    case "Snow":
      return "SNOW";
    default:
      return "CLEAR_DAY";
  }
}
function FormatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  return days[date.getDay()];
}

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);
  console.log("Forecast state:", forecast);

  function handleResponse(response) {
    setForecast(response.data.list);
    setLoaded(true);
  }
  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  if (!loaded) {
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.coordinates.lat}&lon=${props.coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

    return null;
  }

  if (!forecast) {
    return null;
  }
  let dailyForecasts = [
    forecast[0],
    forecast[8],
    forecast[16],
    forecast[24],
    forecast[32],
  ];
  return (
    <div className="weatherforecast">
      {dailyForecasts.map(function (day, index) {
        return (
          <div className="forecast-day" key={index}>
            <div>{FormatDay(day.dt)}</div>

            <ReactAnimatedWeather
              icon={showIcon(day.weather[0].main)}
              color="#212121"
              size={38}
              animate={true}
            />

            <div>
              <strong>{Math.round(day.main.temp_max)}°</strong>{" "}
              {Math.round(day.main.temp_min)}°
            </div>

            <div>{day.weather[0].main}</div>
          </div>
        );
      })}
    </div>
  );
}
