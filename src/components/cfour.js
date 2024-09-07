import React, { useState } from 'react';
import '../styles/cfour.css';

const ConnectFour = () => {
  const [board, setBoard] = useState(Array(6).fill(null).map(() => Array(7).fill(null)));
  const [isRedNext, setIsRedNext] = useState(true); // true means Red's turn
  const [winner, setWinner] = useState(null);

  const handleClick = (col) => {
    if (winner) return; // Prevent moves if there's a winner

    const newBoard = board.map(row => row.slice());
    for (let row = 5; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = isRedNext ? 'R' : 'Y';
        break;
      }
    }

    // Check if the move resulted in a win
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }

    setBoard(newBoard);
    setIsRedNext(!isRedNext); // Switch turns
  };

  const calculateWinner = (board) => {
    const checkLine = (a, b, c, d) => {
      return a !== null && a === b && a === c && a === d;
    };

    // Check rows, columns, and diagonals for a winner
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (c + 3 < 7 && checkLine(board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3])) return board[r][c];
        if (r + 3 < 6) {
          if (checkLine(board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c])) return board[r][c];
          if (c + 3 < 7 && checkLine(board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3])) return board[r][c];
          if (c - 3 >= 0 && checkLine(board[r][c], board[r + 1][c - 1], board[r + 2][c - 2], board[r + 3][c - 3])) return board[r][c];
        }
      }
    }
    return null;
  };

  const startNewGame = () => {
    setBoard(Array(6).fill(null).map(() => Array(7).fill(null)));
    setIsRedNext(true);
    setWinner(null);
  };

  return (
    <div id="connect-four-container" className="connect-four-container">
      <div id="connect-four-board" className="connect-four-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="connect-four-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`connect-four-cell ${cell}`}
                onClick={() => handleClick(colIndex)}
                id={`cell-${rowIndex}-${colIndex}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {winner && <div id="connect-four-status" className="connect-four-status">Winner: {winner === 'R' ? 'Red' : 'Yellow'}</div>}
      <button id="connect-four-reset-button" className="connect-four-reset-button" onClick={startNewGame}>Start New Game</button>
    </div>
  );
};

export default ConnectFour;
