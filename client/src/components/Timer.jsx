import React, { useState, useEffect } from 'react';
import { getTimePassed } from '../utils';

const Timer = ({ onTimeUp, timeLimit }) => {
  const [timePassed, setTimePassed] = useState(0);

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setTimePassed((timePassed) => {
        if (timePassed !== timeLimit) {
          return timePassed + 1;
        }

        return timePassed;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timePassed]);

  useEffect(() => {
    if (timePassed === timeLimit) {
      onTimeUp();
    }
  }, [timePassed]);

  return (
    <h2>
      You have 2 minutes to complete the quiz. Time passed:{' '}
      {getTimePassed(timePassed)}
    </h2>
  );
};

export default Timer;
