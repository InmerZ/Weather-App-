import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const key = "38c436c7bc41ff89d32db50aab3480ea";

function App() {
  const [weather, setWeather] = useState();
  const [coords, setCoords] = useState();
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");
  const [searchedCityWeather, setSearchedCityWeather] = useState(null); 
  const success = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const { lat, lon } = coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;
      axios
        .get(url)
        .then((res) => setWeather(res.data))
        .catch((err) => console.log(err));
    }
  }, [coords, units]);

  const fetchWeatherByCity = () => {
    if (city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          setSearchedCityWeather(res.data); 
        })
        .catch((err) => console.log(err));
    }
  };

  const toggleUnits = () => {
    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
  };

  return (
    <div>
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherByCity} className="getWeather">Get Weather</button>
      </div>
      <WeatherCard
        weatherObject={weather}
        units={units}
        toggleUnits={toggleUnits}
        searchedCityWeather={searchedCityWeather}
      />
    </div>
  );
}

export default App;
