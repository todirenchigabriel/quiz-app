import React, { useState, useEffect } from 'react';

const Scoreboard = ({ userScore }) => {
  const [scores, setScores] = useState([]);

  console.log(scores);

  useEffect(() => {
    try {
      const scoreboard = JSON.parse(localStorage.getItem('scoreboard'));

      if (userScore) {
        let newScores = [];
        if (scoreboard) {
          newScores = [...scoreboard, userScore];
        } else {
          newScores.push(userScore);
        }

        localStorage.setItem('scoreboard', JSON.stringify(newScores));
        setScores(newScores);
      } else {
        setScores(scoreboard);
      }
    } catch (error) {}
  }, []);

  return (
    <ul>
      <h1>Other people scores</h1>
      {scores?.map((score) => (
        <li key={score.name}>
          {score.name} <span>{score.score}</span>
        </li>
      ))}
    </ul>
  );
};

export default Scoreboard;
