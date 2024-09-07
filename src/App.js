import React from 'react';
import './styles/App.css';  // Correct path to App.css
import Game from './components/Game';  // Correct path to Game.js

const App = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
};

export default App;
