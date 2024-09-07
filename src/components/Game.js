import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicTacToe from './TicTacToe';
import ConnectFour from './cfour';
import Hangman from './Hangman';
import MemoryGame from './MemoryGame'; 
import '../styles/Game.css';

const Game = () => {
  const [gameType, setGameType] = useState('');
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  useEffect(() => {
    // Fetch scores from the server
    const fetchScores = async () => {
      try {
        const response = await axios.get('/api/games');
        if (response.data.length > 0) {
          const latestGame = response.data[response.data.length - 1];
          setScores(latestGame.scores);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  const handleGameTypeChange = (type) => {
    setGameType(type);
  };

  return (
    <div className="game-container">
      <div className="scores">
        <div className="score">Player 1 Score: {scores.player1}</div>
        <div className="score">Player 2 Score: {scores.player2}</div>
      </div>
      <div className="game-selector">
        <button onClick={() => handleGameTypeChange('TicTacToe')}>Tic-Tac-Toe</button>
        <button onClick={() => handleGameTypeChange('ConnectFour')}>Connect Four</button>
        <button onClick={() => handleGameTypeChange('Hangman')}>Hangman</button>
        <button onClick={() => handleGameTypeChange('MemoryGame')}>Memory Game</button>
      </div>
      <div className="game-content">
        {gameType === 'TicTacToe' && <TicTacToe updateScores={setScores} />}
        {gameType === 'ConnectFour' && <ConnectFour updateScores={setScores} />}
        {gameType === 'Hangman' && <Hangman updateScores={setScores} />}
        {gameType === 'MemoryGame' && <MemoryGame updateScores={setScores} />}
      </div>
    </div>
  );
};

export default Game;
