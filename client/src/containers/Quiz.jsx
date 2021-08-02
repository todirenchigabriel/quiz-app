import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Question from '../components/Question';
import Modal from '../components/Modal';
import { getRequestUrl } from '../utils';

const Quiz = ({ amount, difficulty, type, name, setUserScore }) => {
  let history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const requestURL = getRequestUrl(amount, difficulty, type);

      setIsLoading(true);
      const response = await axios.get(requestURL);
      if (response?.status === 200) {
        const results = response?.data?.results || [];
        setQuestions(results);

        const answers = results.reduce((acc, cv, index) => {
          acc[index] = {
            correctAnswer: cv.correct_answer,
            userAnswer: '',
          };

          return acc;
        }, {});

        setAnswers(answers);
      } else {
        setHasError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleSelectAnswer = (answer, questionIndex) => {
    const newAnswers = {
      ...answers,
      [questionIndex]: {
        ...answers[questionIndex],
        userAnswer: answer,
      },
    };

    setAnswers(newAnswers);
  };

  const onPreviousQuestion = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const onNextQuestion = () => {
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculateScore = () => {
    let score = 0;

    Object.entries(answers).forEach((answer) => {
      const { userAnswer, correctAnswer } = answer[1];
      if (userAnswer === correctAnswer) {
        score += 1;
      }
    });

    setScore(score);
  };

  const getUnansweredQuestions = () => {
    const unansweredActions = [];
    Object.entries(answers).forEach((answer, index) => {
      const { userAnswer } = answer[1];
      if (userAnswer === '') {
        unansweredActions.push(index + 1);
      }
    });

    return unansweredActions;
  };

  const renderQuestion = () => {
    const { correct_answer, incorrect_answers, question } =
      questions[currentQuestion];

    return (
      <Question
        correctAnswer={correct_answer}
        incorectAnswers={incorrect_answers}
        question={question}
        questionIndex={currentQuestion}
        onSelectAnswer={handleSelectAnswer}
      />
    );
  };

  if (hasError) {
    return <div>There's been an error.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Quiz App</h1>
      {questions.length > 0 && renderQuestion()}

      <p>
        <button onClick={onPreviousQuestion}>Previous Question</button>
        <button onClick={onNextQuestion}>Next Question</button>

        {currentQuestion === questions.length - 1 && (
          <button onClick={() => setConfirmModalVisible(true)}>Submit</button>
        )}
      </p>

      <ul>
        <h3>Jump to question</h3>
        {questions.map((_, idx) => (
          <li key={idx} onClick={() => setCurrentQuestion(idx)}>
            Question {idx + 1}
          </li>
        ))}
      </ul>

      <Modal
        isOpen={confirmModalVisible}
        title='Are you sure you want to submit?'
        onCancel={() => setConfirmModalVisible(false)}
        onConfirm={() => {
          setConfirmModalVisible(false);
          calculateScore();
          setResultsModalVisible(true);
        }}>
        <div>
          {getUnansweredQuestions() && (
            <div>
              <div>
                You answered{' '}
                {questions.length - getUnansweredQuestions().length} questions
              </div>
              <div>
                You may want to cancel the submission and answer the following
                questions too:
                {getUnansweredQuestions().join()}
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={resultsModalVisible}
        title='Congratulations!'
        onCancel={() => {
          setResultsModalVisible(false);
          history.push('/');
        }}
        onConfirm={() => {
          setResultsModalVisible(false);
          setUserScore({
            name,
            score,
          });
          history.push('/scoreboard');
        }}>
        <div>Your score is {score}</div>
        <div>Do you want to save your score?</div>
      </Modal>
    </div>
  );
};

export default Quiz;
