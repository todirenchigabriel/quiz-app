import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Question from '../components/Question';
import Modal from '../components/Modal';
import { getRequestUrl } from '../utils';

import './quiz.scss';

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
      try {
        const requestURL = getRequestUrl(amount, difficulty, type);
        setIsLoading(true);
        const response = await fetch(requestURL);
        const data = await response.json();

        if (data?.results?.length) {
          const results = data?.results || [];
          setQuestions(results);

          const answers = results.reduce((acc, cv, index) => {
            acc[index] = {
              correctAnswer: cv.correct_answer,
              userAnswer: '',
            };

            return acc;
          }, {});

          setAnswers(answers);
        }
      } catch (error) {
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

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
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
        key={correct_answer}
        correctAnswer={correct_answer}
        incorectAnswers={incorrect_answers}
        question={question}
        questionIndex={currentQuestion}
        onSelectAnswer={handleSelectAnswer}
      />
    );
  };

  if (hasError) {
    return (
      <div className='quizPage'>
        <div className='container'>
          <div className='errorMessage'>
            There's been an error. Please try again.
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='quizPage'>
        <div className='container'>
          <Loader
            type='Oval'
            color='#10124a'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      </div>
    );
  }

  return (
    <div className='quizPage'>
      <h1>Question {currentQuestion + 1}</h1>
      <div className='additionalInfo'>
        <div>
          Selecting an answer will automatically redirect you to the next
          question.
        </div>
        <div>
          You can navigate between the questions by using the Next/Previous
          question buttons or the Jump to question section.
        </div>
      </div>
      <div className='questionnaire'>
        <div>
          {questions.length > 0 && renderQuestion()}
          {currentQuestion !== 0 && (
            <button className='navigationButton' onClick={onPreviousQuestion}>
              Previous Question
            </button>
          )}

          {currentQuestion !== questions.length - 1 && (
            <button className='navigationButton' onClick={onNextQuestion}>
              Next Question
            </button>
          )}

          {currentQuestion === questions.length - 1 && (
            <button
              className='submitButton'
              onClick={() => setConfirmModalVisible(true)}>
              Submit
            </button>
          )}
        </div>

        <div className='tableOfContents'>
          <div className='tableOfContentsTitle'>Jump to question</div>
          <ul className='tableOfContentsList'>
            {questions.map((_, idx) => (
              <li key={idx} onClick={() => setCurrentQuestion(idx)}>
                Question {idx + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>

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
              {getUnansweredQuestions().length && (
                <div>
                  You may want to cancel the submission and answer the following
                  questions too:
                  {getUnansweredQuestions().join()}
                </div>
              )}
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
