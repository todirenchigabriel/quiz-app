import React, { useState, useEffect } from 'react';
import './quizSetup.scss';

const QuizSetupForm = ({ onSubmit, onCancel }) => {
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState('any');
  const [questionType, setQuestionType] = useState('any');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    try {
      const scoreboard = JSON.parse(localStorage.getItem('scoreboard'));
      const otherUsers = scoreboard.map(({ name }) => name);

      setOtherUsers(otherUsers);
    } catch (error) {}
  }, []);

  const handleSubmit = () => {
    if (name === '') {
      setNameError('Name cannot be empty');
      return;
    }

    if (!nameError) {
      onSubmit({
        amount,
        difficulty,
        type: questionType,
        name,
      });
    }
  };

  const onChangeDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const onChangeAmount = (e) => {
    setAmount(+e.target.value);
  };

  const onChangeQuestionType = (e) => {
    setQuestionType(e.target.value);
  };

  const onChangeName = (e) => {
    const name = e.target.value;

    if (name === '') {
      setNameError('Name cannot be empty');
      setName(name);
      return;
    } else if (otherUsers.includes(name)) {
      setNameError('User already exists');
      setName(name);
    } else {
      setName(name);
      setNameError('');
    }
  };

  return (
    <div className='quizSetup'>
      <div className='quizInfo'>Lets configure a few things first...</div>
      {nameError && <div>Please fix the errors before submiting</div>}
      <div className='quizSetupGroup'>
        <label>Your name</label>
        <input
          className='input'
          type='text'
          value={name}
          onChange={onChangeName}
        />
        {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
      </div>
      <div className='quizSetupGroup'>
        <label>Number of questions</label>
        <input
          type='radio'
          value={10}
          name='amount'
          checked={amount === 10}
          onChange={onChangeAmount}
        />{' '}
        10
        <input
          type='radio'
          value={15}
          name='amount'
          checked={amount === 15}
          onChange={onChangeAmount}
        />{' '}
        15
        <input
          type='radio'
          value={20}
          name='amount'
          checked={amount === 20}
          onChange={onChangeAmount}
        />{' '}
        20
      </div>
      <div className='quizSetupGroup'>
        <label>Difficulty</label>
        <input
          type='radio'
          value='any'
          name='difficulty'
          checked={difficulty === 'any'}
          onChange={onChangeDifficulty}
        />
        Any
        <input
          type='radio'
          value='easy'
          name='difficulty'
          checked={difficulty === 'easy'}
          onChange={onChangeDifficulty}
        />
        Easy
        <input
          type='radio'
          value='medium'
          name='difficulty'
          checked={difficulty === 'medium'}
          onChange={onChangeDifficulty}
        />
        Medium
        <input
          type='radio'
          value='hard'
          name='difficulty'
          checked={difficulty === 'hard'}
          onChange={onChangeDifficulty}
        />
        Hard
      </div>
      <div className='quizSetupGroup'>
        <label>Question Type</label>
        <input
          type='radio'
          value='any'
          name='questionType'
          checked={questionType === 'any'}
          onChange={onChangeQuestionType}
        />{' '}
        Any
        <input
          type='radio'
          value='multiple'
          name='questionType'
          checked={questionType === 'multiple'}
          onChange={onChangeQuestionType}
        />{' '}
        Multiple Choice
        <input
          type='radio'
          value='boolean'
          name='questionType'
          checked={questionType === 'boolean'}
          onChange={onChangeQuestionType}
        />{' '}
        True/False
      </div>
      <div className='buttons'>
        <button className='confirmButton' onClick={handleSubmit}>
          Submit
        </button>
        <button className='cancelButton' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default QuizSetupForm;
