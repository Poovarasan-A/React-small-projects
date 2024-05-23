import React, { useState } from "react";
import "./Advisor.css";

const Advisor = () => {
  const [advice, setAdvice] = useState("Click below to get advice");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getAdvice() {
    setLoading(true);

    try {
      const result = await fetch("https://api.adviceslip.com/advice");
      const advices = await result.json();

      setAdvice(advices.slip.advice);
      setCount((c) => c + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  //   useEffect(function () {
  //     getAdvice();
  //   }, []);

  return (
    <div className="advisor">
      <h2>" {advice} "</h2>
      <button onClick={getAdvice} disabled={loading}>
        {loading ? "Loading..." : "Get Advice"}
      </button>
      <h3>
        You have read {count} {count <= 1 ? "advice" : "advices"} today
      </h3>
    </div>
  );
};

export default Advisor;
