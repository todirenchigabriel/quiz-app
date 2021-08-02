import React from 'react';
import { shuffleArray } from '../utils';

const Question = ({
  correctAnswer,
  incorectAnswers,
  question,
  onSelectAnswer,
  questionIndex,
}) => {
  const answers = shuffleArray([correctAnswer, ...incorectAnswers]);

  return (
    <div>
      <div>{question}</div>
      {answers?.map((answer) => (
        <button
          onClick={() => {
            onSelectAnswer(answer, questionIndex);
          }}
          key={answer}>
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Question;
