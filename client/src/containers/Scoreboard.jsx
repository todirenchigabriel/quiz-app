import React, { useState, useEffect } from 'react';

const Scoreboard = ({ userScore }) => {
  const [scores, setScores] = useState([]);

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
      <h1>Leaderboard</h1>
      {scores?.map((score) => (
        <li>
          {score.name} <span>{score.score}</span>
        </li>
      ))}
    </ul>
  );
};

export default Scoreboard;
