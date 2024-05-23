import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navcontainer">
      <nav>
        <ul>
          <Link to="/weather" style={{ textDecoration: "none" }}>
            <li>Weather App</li>
          </Link>
          <div className="line"></div>
          <Link to="/bmi" style={{ textDecoration: "none" }}>
            <li>BMI Calculator</li>
          </Link>
          <div className="line"></div>
          <Link to="/advisor" style={{ textDecoration: "none" }}>
            <li>Advisor App</li>
          </Link>
          <div className="line"></div>
          <Link to="/qrgen" style={{ textDecoration: "none" }}>
            <li>QR Generator</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
