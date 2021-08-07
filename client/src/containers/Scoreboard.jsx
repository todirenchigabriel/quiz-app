import React, { useState, useEffect } from 'react';
import './scoreboard.scss';

const Scoreboard = ({ userScore, setUserScore }) => {
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

      setUserScore(null);
    } catch (error) {}
  }, []);

  return (
    <div className='scoreboardPage'>
      <h1>Other people's score</h1>
      <ul className='scoreboardList'>
        <li className='listTitle'>
          <span>Username</span> <span>Score</span>
        </li>
        {scores?.map((score) => (
          <li key={score.name}>
            {score.name} <span>{score.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
