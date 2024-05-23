import React, { useState } from "react";
import "./QrGenerator.css";

function QrGenerator() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [size, setSize] = useState("150");

  async function generateQr() {
    setLoading(true);
    try {
      if (!data) {
        alert("Please enter a URL to generate QR code.");
        return;
      }
      const URL = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        data
      )}`;
      setImg(URL);
    } catch (error) {
      console.error("error" + error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQr() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qr code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  return (
    <div className="qrgen">
      <nav>
        <h1>QR CODE GENERATOR</h1>
      </nav>
      <div className="qrcontainer">
        <div className="qr">
          {loading && <p>{loading}</p>}
          {img && <img src={img} alt="" />}
        </div>
        <div className="details">
          <label htmlFor="qrData">Enter Your URL below to Generate</label>
          <input
            type="text"
            id="qrData"
            placeholder="Enter Your URL"
            onChange={(e) => {
              setData(e.target.value);
            }}
          />

          <label htmlFor="qrSize">Enter Image Size(e.g.150..)</label>
          <input
            type="text"
            id="qrSize"
            placeholder="Enter Image Size"
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
          <div className="btns">
            <button
              className="generateBtn"
              disabled={loading}
              onClick={generateQr}
            >
              Generate QR
            </button>
            <button className="downldBtn" onClick={downloadQr}>
              Download QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrGenerator;
