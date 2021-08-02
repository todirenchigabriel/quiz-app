import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/quiz'>Quiz</Link>
        </li>
        <li>
          <Link to='/scoreboard'>Scoreboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
