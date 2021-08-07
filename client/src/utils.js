export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

export const getRequestUrl = (amount, difficulty, type) => {
  let requestUrl = `https://opentdb.com/api.php?amount=${amount}`;

  if (difficulty && difficulty !== 'any') {
    requestUrl += `&difficulty=${difficulty}`;
  }

  if (type && type !== 'any') {
    requestUrl += `&type=${type}`;
  }

  return requestUrl;
};

export const getTimePassed = (timePassed) => {
  return `${Math.floor(timePassed / 60)}:${timePassed % 60} minutes`;
};
