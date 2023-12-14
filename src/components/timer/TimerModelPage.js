// THIS COMPONENT IS BEING USED
import React, { useState, useEffect } from 'react';

const TimerModelPage = (props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const deadline = parseInt(props.time_horizon[1]) * 1000;
  const getTime = () => {
    const utcTimestamp = Date.now();
    const time = deadline - utcTimestamp;
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    if (hours > 0) {
      setHours(hours);
    } else {
      setHours(0);
    }
    if (minutes > 0) {
      setMinutes(minutes);
    } else {
      setMinutes(0);
    }
    if (seconds > 0) {
      setSeconds(seconds);
    } else {
      setSeconds(0);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="timer" role="timer">
      <div className="col-4">
        <div className="for-model-details">
          <p id="hour">{hours < 10 ? '0' + hours : hours}:</p>
        </div>
      </div>
      <div className="col-4">
        <div className="for-model-details">
          <p id="minute">{minutes < 10 ? '0' + minutes : minutes}:</p>
        </div>
      </div>
      <div className="col-4">
        <div className="for-model-details">
          <p id="second">{seconds < 10 ? '0' + seconds : seconds}</p>
        </div>
      </div>
    </div>
  );
};

export default TimerModelPage;
