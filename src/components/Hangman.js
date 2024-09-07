import React, { useState } from 'react';
import '../styles/hangman.css';


const words = ['REACT','JAVASCRIPT','HTML','CSS','NODE','PYTHON','JAVA','SQL','GIT','GITHUB','DOCKER','ANGULAR','NODEJS'];


const Hangman = () => {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrongGuesses = 6;

  const handleGuess = (letter) => {
    if (word.includes(letter)) {
      setGuessedLetters(prev => [...prev, letter]);
    } else {
      setWrongGuesses(prev => prev + 1);
    }
  };
  const resetGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  const displayWord = word.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');

  const isGameOver = wrongGuesses >= maxWrongGuesses || !displayWord.includes('_');
  const isWinner = !displayWord.includes('_');

  return (
    <div id="hangman-container" className="hangman">
      <div id="word-display" className="word">{displayWord}</div>
      <div id="wrong-guesses" className="wrong-guesses">
        Wrong Guesses: {wrongGuesses} / {maxWrongGuesses}
      </div>
      <div id="letters-container" className="letters">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
          <button
            key={letter}
            id={`letter-${letter}`}
            className="letter-button"
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || isGameOver}
          >
            {letter}
          </button>
        ))}
      </div>
      {isGameOver && (
        <div id="game-status" className="game-status">
          {isWinner ? 'You Win!' : 'You Lose!'} The word was "{word}".
        </div>
      )}
      <button id="reset-button" className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Hangman;
