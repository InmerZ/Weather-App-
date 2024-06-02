import React from "react";

const WeatherCard = ({ weatherObject, units, toggleUnits, searchedCityWeather }) => {
  const convertTemperature = (temp, unit) => {
    if (unit === "metric") {
      return temp;
    } else {
      return (temp * 9) / 5 + 32;
    }
  };

  return (
    <div>
      {weatherObject || searchedCityWeather ? (
        <div>
          <h2>
            {searchedCityWeather ? `${searchedCityWeather.name}, ${searchedCityWeather.sys.country}` : `${weatherObject.name}, ${weatherObject.sys.country}`}
          </h2>
          <section>
            <figure>
              <img
                src={`https://openweathermap.org/img/wn/${searchedCityWeather ? searchedCityWeather.weather[0].icon : weatherObject.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            </figure>
            <p>{searchedCityWeather ? searchedCityWeather.weather[0].description : weatherObject.weather[0].description}</p>
            <p>
              Temperature: {convertTemperature(searchedCityWeather ? searchedCityWeather.main.temp : weatherObject.main.temp, units).toFixed(2)}
              {units === "metric" ? "°C" : "°F"}
            </p>
            <p>Humidity: {searchedCityWeather ? searchedCityWeather.main.humidity : weatherObject.main.humidity}%</p>
            <p>Wind Speed: {searchedCityWeather ? searchedCityWeather.wind.speed : weatherObject.wind.speed} {units === "metric" ? "m/s" : "mph"}</p>
            <button onClick={toggleUnits} className="toggle-button">
              {units === "metric" ? "Switch to Fahrenheit" : "Switch to Celsius"}
            </button>
          </section>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherCard;
