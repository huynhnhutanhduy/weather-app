import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";

function App() {
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState(null);
  const [errMassage, setErrMassage] = useState("");
  const [fahrenheit, setFahrenheit] = useState(false);

  const handleFetchData = async (check) => {
    // console.log("handleFetchData ~ check", check);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9b1a6ace49ad66d07fd4b224f849a484&units=${
          check ? "imperial" : "metric"
        }`
      );
      // console.log(res.data);
      // console.log(typeof res.data); // typeof res.data is Object
      setData(res.data || {});
      // console.log(new Date(res.data.dt * 1000)); // Timestamp is seconds, so the need to convert Unix timestamp into milliseconds before using it in Javascript => seconds * 1000 = milliseconds
      setErrMassage("");
    } catch (error) {
      // console.log(error);
      setErrMassage(`The error ${error}`);
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setCityName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handleSubmit ~ fahrenheit", fahrenheit);
    handleFetchData(fahrenheit);
  };

  const handleMeasureChange = (e) => {
    // console.log(e.target.checked);
    setFahrenheit(e.target.checked);
    handleFetchData(e.target.checked);
  };

  return (
    <div className="weather">
      {/* Search box */}
      <div className="weather-search">
        <form className="form-search" onSubmit={handleSubmit}>
          <input
            placeholder="Enter location ..."
            type="text"
            className="search-input"
            value={cityName}
            onChange={handleChange}
          />
          <button type="submit" className="search-icon">
            <BiSearchAlt />
          </button>
        </form>
      </div>

      {/* {loading && <div className="loading"></div>} */}
      {/* {!loading && errMassage && <p className="error">{errMassage}</p>} */}
      {errMassage && <p className="error">{errMassage}</p>}

      {/* !loading && data && () */}
      {data && (
        <div>
          {/* Switch button */}
          <div className="weather-switch">
            <h3> °C</h3>
            <input
              type="checkbox"
              id="switch"
              className="switch-input"
              onChange={handleMeasureChange}
            />
            <label htmlFor="switch" className="switch"></label>
            <h3> °F</h3>
          </div>

          {/* Container */}
          <div className="weather-container">
            {/* Header */}
            <div className="weather-header">
              <div className="weather-first">
                <div className="weather-location">
                  <h3>{data.name}</h3>
                </div>
                <div className="weather-date">
                  {new Date(data.dt * 1000).toDateString() +
                    ", " +
                    new Date().toLocaleTimeString()}
                </div>
                <div className="weather-description">
                  <img
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="weather icon"
                  />
                  <p>{data.weather[0].description}</p>
                </div>
              </div>
              <div className="weather-second">
                <div className="weather-temperature">
                  <h1>{data.main.temp.toFixed()}</h1>
                  <h3>{fahrenheit ? "°F" : "°C"}</h3>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="weather-footer">
              <div className="weather-feels">
                <p className="bold">
                  {data.main.feels_like.toFixed()} {fahrenheit ? "°F" : "°C"}
                </p>
                <p>Feels Like</p>
              </div>
              <div className="weather-humidity">
                <p className="bold">{data.main.humidity}%</p>
                <p>Humidity</p>
              </div>
              <div className="weather-visibility">
                <p className="bold">{(data.visibility / 1000).toFixed(1)}km</p>
                <p>Visibility</p>
              </div>
              <div className="weather-wind">
                <p className="bold">{Math.round(data.wind.speed * 10) / 10}m/s</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
