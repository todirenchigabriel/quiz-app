import React, { useState } from 'react';
import classNames from 'classnames';
import { shuffleArray } from '../utils';
import './question.scss';

const Question = ({
  correctAnswer,
  incorectAnswers,
  question,
  onSelectAnswer,
  questionIndex,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const answers = shuffleArray([correctAnswer, ...incorectAnswers]);

  return (
    <div className='question'>
      <div className='questionText'>Q: {question}</div>
      <div className='questionAnswers'>
        {answers?.map((answer) => (
          <button
            className={classNames('questionAnswer', {
              selectedAnswer: answer === selectedAnswer,
            })}
            onClick={() => {
              setSelectedAnswer(answer);
              onSelectAnswer(answer, questionIndex);
            }}
            key={answer}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
