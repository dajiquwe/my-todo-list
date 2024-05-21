import React, { useEffect, useState } from 'react';
import './Timer.css';

function Timer() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimeOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // При выходе из вкладки обновляет таймер
  }, [timerOn]);

  return (
    <div className="timer">
      <div>{time}</div>
      <div>
        <button onClick={() => setTimeOn(true)}>Start</button>
        <button onClick={() => setTimeOn(false)}>Stop</button>
        <button onClick={() => setTimeOn(true)}>Resume</button>
      </div>
    </div>
  );
}

export default Timer;
