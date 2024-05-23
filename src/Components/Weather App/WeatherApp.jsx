import React, { useEffect, useState } from "react";
import "./WeatherApp.css";

// Images

import searchIcon from "./images/search.png";
import sunIcon from "./images/sun.png";
import cloudIcon from "./images/cloudy-day.png";
import drizzleIcon from "./images/drizzle.png";
import rainIcon from "./images/rainy.png";
import snowIcon from "./images/snowing.png";
import hazeIcon from "./images/haze.png";
import snowyBg from "./images/Snowy.jpg";
import hazyBg from "./images/HazyBg.jpg";
import sunnyBg from "./images/Sunny.jpg";
import cloudyBg from "./images/Cloudy.jpg";

// --------------------------------- second component of City name and country ----------------------------------

const CityCountry = ({ city, country, loading }) => {
  return (
    <>
      <div className="city">
        {loading && <p>{loading}</p>}
        <h1>Weather in {city}</h1>
      </div>
      <div className="country">
        <small>{country}</small>
      </div>
    </>
  );
};

//----------------------------- Third component of Weather Details -------------------------------------------
const WeatherDetails = ({
  temp,
  ambience,
  ambienceName,
  humi,
  wind,
  direction,
  day,
  date,
  month,
  year,
  hours,
  mins,
  meridian,
}) => {
  return (
    <>
      <div className="weather-container">
        <div className="weatherContent">
          <div className="ambience">
            <img src={ambience} alt="" />
            <strong>{ambienceName}</strong>
          </div>
          <div className="humidity">
            <strong>Humidity - {humi} %</strong>
          </div>
          <div className="wind">
            <strong>Wind Speed - {wind} Km/hr</strong>
          </div>
          <div className="direction">
            <strong>Wind Direction - {direction}</strong>
          </div>
        </div>
        <div className="temp-date">
          <div className="temp">
            <h1>{temp}°C</h1>
            <p>
              {day} | {date} {month} {year}
            </p>
            <p>
              {hours} : {mins} {meridian}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

function WeatherApp() {
  const [search, setSearch] = useState("Chennai");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState(0);
  const [ambience, setAmbience] = useState("");
  const [ambienceName, setAmbienceName] = useState("");
  const [humi, setHumi] = useState(0);
  const [wind, setWind] = useState(0);
  const [direction, setDirection] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [day, setDay] = useState("Sunday");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hours, setHours] = useState("");
  const [mins, setMins] = useState("");
  const [meridian, setMeridian] = useState("");

  const weatherIconMap = {
    "01d": sunIcon,
    "01n": sunIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": hazeIcon,
    "50n": hazeIcon,
  };
  const bgMap = {
    "01d": sunnyBg,
    "01n": sunnyBg,
    "02d": cloudyBg,
    "02n": cloudyBg,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowyBg,
    "13n": snowyBg,
    "50d": hazyBg,
    "50n": hazyBg,
  };
  const searchCity = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=c31df49d3f60725229d1b532825e7fa1&units=Metric`;

    try {
      let response = await fetch(url);
      let resultData = await response.json();
      if (resultData.cod === "404") {
        setCityNotFound(true);
        return;
      }
      setHumi(resultData.main.humidity);
      setWind(resultData.wind.speed);
      setTemp(Math.floor(resultData.main.temp));
      setCity(resultData.name);
      setCountry(resultData.sys.country);

      const weatherIconCode = resultData.weather[0].icon;
      // const bgImgCode = resultData.weather[0];
      setAmbience(weatherIconMap[weatherIconCode] || sunIcon);
      setAmbienceName(resultData.weather[0].main);

      setCityNotFound(false);

      const directionCode = resultData.wind.deg;
      let directionMap = "";
      if (directionCode <= 45 || directionCode > 360) {
        directionMap = "North ";
      } else if (directionCode <= 90) {
        directionMap = "North West";
      } else if (directionCode <= 135) {
        directionMap = "East";
      } else if (directionCode <= 180) {
        directionMap = "South West";
      } else if (directionCode <= 225) {
        directionMap = "South";
      } else if (directionCode <= 270) {
        directionMap = "South East";
      } else if (directionCode <= 315) {
        directionMap = "West";
      }
      setDirection(directionMap);
    } catch (error) {
      setCityNotFound(true);
      console.error("An error occurred :", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchCity();
    }
  };
  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayOfWeek = new Date();
    const currentDay = days[dayOfWeek.getDay()];
    setDay(currentDay);
    setDate(dayOfWeek.getDate());
    const currentMonth = months[dayOfWeek.getMonth()];
    setMonth(currentMonth);
    setYear(dayOfWeek.getFullYear());
    const currentHours = dayOfWeek.getHours();
    const formatHours = currentHours <= 12 ? currentHours : currentHours - 12;
    setHours(String(formatHours).padStart(2, "0"));
    setMins(String(dayOfWeek.getMinutes()).padStart(2, "0"));
    const currentMeridian = currentHours;
    setMeridian(currentMeridian < 12 ? "AM" : "PM");
  }, []);

  useEffect(
    function () {
      searchCity();
    },
    [searchCity]
  );

  return (
    <div className="weather">
      {/* -------------------------- first component of search bar -------------------------- */}
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search"
            className="searchInput"
            onChange={handleSearch}
            value={search}
            onKeyDown={handleKeyDown}
          />
          <img
            src={searchIcon}
            alt="Search"
            onClick={() => {
              searchCity();
            }}
          />
        </div>
        <CityCountry city={city} country={country} loading={loading} />
        <WeatherDetails
          temp={temp}
          ambience={ambience}
          ambienceName={ambienceName}
          humi={humi}
          wind={wind}
          direction={direction}
          day={day}
          date={date}
          month={month}
          year={year}
          hours={hours}
          mins={mins}
          meridian={meridian}
        />
      </div>
    </div>
  );
}

export default WeatherApp;
