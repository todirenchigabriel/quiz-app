import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import Quiz from './containers/Quiz';
import Scoreboard from './containers/Scoreboard';

const App = () => {
  const [quizConfig, setQuizConfig] = useState(null);
  const [userScore, setUserScore] = useState(null);

  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route
            exact
            path='/'
            render={() => <Home setQuizConfig={setQuizConfig} />}
          />
          <Route
            exact
            path='/quiz'
            render={() =>
              quizConfig ? (
                <Quiz {...quizConfig} setUserScore={setUserScore} />
              ) : null
            }
          />
          <Route
            exact
            path='/scoreboard'
            render={() => <Scoreboard userScore={userScore} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
