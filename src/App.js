import React from "react";
import Navbar from "./Pages/Navbar";
import Advisor from "./Components/Advisor App/Advisor";
import BmiCalculator from "./Components/BMI Calculator/BmiCalculator";
import QrGenerator from "./Components/QR Generator/QrGenerator";
import WeatherApp from "./Components/Weather App/WeatherApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/React-small-projects" element={<Navbar />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/bmi" element={<BmiCalculator />} />
          <Route path="/qrgen" element={<QrGenerator />} />
          <Route path="/weather" element={<WeatherApp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
