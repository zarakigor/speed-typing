import React, { useState, useEffect, useRef } from "react";

function App() {
  const countdown = 10;

  const [text, setText] = useState("");
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [remainingTime, setRemaningTime] = useState(countdown);
  const [countWords, setCountWords] = useState("");
  const textRef = useRef(null);

  function updateText(e) {
    console.log(e.target.value);
    setText(e.target.value);
    const updatedText = e.target.value.split(" ").filter((word) => word !== "");
    setCountWords(updatedText.length);
  }

  function startGame() {
    setIsTimeRunning(true);
    setText("");
    setRemaningTime(countdown);
    setCountWords(0);
    textRef.current.disabled = false;
    textRef.current.focus();
  }

  useEffect(() => {
    if (isTimeRunning && remainingTime > 0) {
      setTimeout(() => {
        setRemaningTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsTimeRunning(false);
    }
  }, [remainingTime, isTimeRunning]);

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        value={text}
        onChange={updateText}
        disabled={!isTimeRunning}
        ref={textRef}
      />
      <h4>Time remaining: {remainingTime}</h4>
      <button onClick={startGame} disabled={isTimeRunning}>
        Start
      </button>
      <h1>Word count: {countWords}</h1>
    </div>
  );
}

export default App;
