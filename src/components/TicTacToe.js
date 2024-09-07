import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ttc.css'; // Ensure ttc.css is in the src/styles folder

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // true means Player 1 (X) is next
  const [gameStatus, setGameStatus] = useState(null);

  const handleClick = (index) => {
    if (gameStatus || board[index]) return; // Ignore clicks if game is over or square is filled

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O'; // Set the board value
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      const result = winner === 'X' ? 'Player 1 wins! ( X )' : 'Player 2 wins! ( O )';
      setGameStatus(result);
      updateScores(winner);
    } else if (!newBoard.includes(null)) { // Check for draw
      setGameStatus('Draw');
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return 'X' or 'O'
      }
    }
    return null;
  };

  const updateScores = (winner) => {
    const player1Score = winner === 'X' ? 1 : 0;
    const player2Score = winner === 'O' ? 1 : 0;
    
    axios.patch('/api/games/ID_OF_THE_GAME', {
      player1Score,
      player2Score,
    })
    .then(response => console.log('Scores updated'))
    .catch(error => console.error('Error updating scores:', error));
  };

  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true); // Reset to Player 1 (X) starting
    setGameStatus(null);
  };

  return (
    <div id="tic-tac-toe-container" className="tic-tac-toe">
      <div id="board">
        {board.map((value, index) => (
          <button
            key={index}
            id={`square-${index}`}
            className={`square ${value ? `square-${value}` : ''}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      {gameStatus && (
        <div id="game-status-container" className="game-status">
          <p id="game-status-message">{gameStatus}</p>
          <button id="new-game-button" onClick={startNewGame}>Start New Game</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
