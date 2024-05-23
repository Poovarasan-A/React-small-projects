import { useState } from "react";
import "./BmiCalculator.css";

function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("None");
  const [bmiStatus, setBmiStatus] = useState("None");
  const [gender, setGender] = useState("None");
  const [showGender, setShowGender] = useState(false);
  const [showAge, setShowAge] = useState(false);

  const calculateBmi = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(1));
      if (bmiValue < 18.5) {
        setBmiStatus("Under");
      } else if (bmiStatus >= 18.5 && bmiValue < 24.9) {
        setBmiStatus("Normal");
      } else if (bmiValue >= 25.0 && bmiValue < 29.9) {
        setBmiStatus("Over");
      } else if (bmiValue > 29.9) {
        setBmiStatus("Obese");
      }
      setShowAge(true);
      setShowGender(true);
    } else {
      alert("Please enter valid height and weight in input");
    }
  };
  const selectGender = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <div className="bmical">
      <div>
        <nav>
          <h1>BMI CALCULATOR</h1>
        </nav>
        <div className="container">
          <div className="note">
            <span>Note:</span>
            <p>1. Underweight: BMI below 18.5</p>
            <p>2. Healthy weight: BMI 18.5–24.9</p>
            <p>3. Overweight: BMI 25.0–29.9</p>
          </div>
          {/* -----gender container------ */}
          <div className="main">
            <div className="gen-container">
              <div
                className={`male-container ${
                  gender === "Male" ? "selected" : ""
                }`}
                onClick={() => selectGender("Male")}
              >
                <i class="fa-solid fa-venus"></i>
                <strong>MALE</strong>
              </div>
              <div
                className={`female-container ${
                  gender === "Female" ? "selected" : ""
                }`}
                onClick={() => selectGender("Female")}
              >
                <i class="fa-solid fa-mars"></i>
                <strong>FEMALE</strong>
              </div>
            </div>
            {/* ------------- units container--------------- */}
            <div className="unit-container">
              <div className="age-container">
                <label htmlFor="age">AGE</label>
                <input
                  type="number"
                  id="age"
                  placeholder="Enter Age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
              <div className="height-container">
                <label htmlFor="height">HEIGHT (Cm)</label>
                <input
                  type="number"
                  id="height"
                  placeholder="Enter Height in cm"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                />
              </div>
              <div className="weight-container">
                <label htmlFor="weight">WEIGHT (Kg)</label>
                <input
                  type="number"
                  id="weight"
                  placeholder="Enter Weight in Kg"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* ---------------- button container-------------------- */}
            <div className="btn-container">
              <button onClick={calculateBmi}>CALCULATE</button>
            </div>
          </div>
          {/* ------------------ result container------------------ */}
          <div className="result-container">
            <p>Your Age is {showAge && <span>{age}</span>}</p>
            <p>Gender is {showGender && <span>{gender}</span>}</p>
            <p>
              You BMI is <span>{bmi}</span>
            </p>
            <p>
              You have <span>{bmiStatus}</span> body weight
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BmiCalculator;
