import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import QuizSetup from '../components/QuizSetup';

import './home.scss';

const Home = ({ setQuizConfig }) => {
  let history = useHistory();
  const [formVisible, setFormVisible] = useState(false);

  const startQuiz = (data) => {
    setQuizConfig(data);
    history.push('/quiz');
  };

  return (
    <div className='homepage'>
      <h1>Welcome to the Quiz App! </h1>
      {!formVisible && (
        <button className='startButton' onClick={() => setFormVisible(true)}>
          Start Quiz
        </button>
      )}
      {formVisible && (
        <QuizSetup
          onSubmit={startQuiz}
          onCancel={() => setFormVisible(false)}
        />
      )}
    </div>
  );
};

export default Home;
