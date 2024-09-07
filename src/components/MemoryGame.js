import React, { useState, useEffect } from 'react';
import image1 from '../image/image1.jpg';
import image2 from '../image/image2.jpg';
import image3 from '../image/image3.jpg';
import image4 from '../image/image4.jpg';
import image5 from '../image/image5.jpg';
import image6 from '../image/image6.jpg';
import '../styles/MemoryGame.css';

const cardImages = [
  { id: 1, image: image1 },
  { id: 2, image: image2 },
  { id: 3, image: image3 },
  { id: 4, image: image4 },
  { id: 5, image: image5 },
  { id: 6, image: image6 },
];

const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]
    .map((card, index) => ({ ...card, uniqueId: index }))
    .sort(() => Math.random() - 0.5);
  return shuffledCards;
};

const MemoryGame = () => {
  const [cards, setCards] = useState(shuffleCards());
  const [revealedCards, setRevealedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (revealedCards.length === 2) {
      setIsProcessing(true);
      const [firstCard, secondCard] = revealedCards;

      if (firstCard.image === secondCard.image) {
        setMatchedCards(prevMatched => [...prevMatched, firstCard.image]);
      }

      setTimeout(() => {
        setRevealedCards([]);
        setIsProcessing(false);
      }, 1000);

      setMoves(prevMoves => prevMoves + 1);
    }
  }, [revealedCards]);

  const handleCardClick = card => {
    if (isProcessing || revealedCards.some(c => c.uniqueId === card.uniqueId) || matchedCards.includes(card.image)) {
      return;
    }

    setRevealedCards(prevRevealed => [...prevRevealed, card]);
  };

  const resetGame = () => {
    setCards(shuffleCards());
    setRevealedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  return (
    <div id="memory-game-container" className="memory-game">
      <h1 id="game-title">Memory Game</h1>
      <p id="moves-counter">Moves: {moves}</p>
      <button id="restart-button" onClick={resetGame}>Restart Game</button>
     
      <div id="game-board" className="game-board">
        {cards.map(card => (
          <div
            key={card.uniqueId}
            id={`card-${card.uniqueId}`}
            className={`card ${revealedCards.some(c => c.uniqueId === card.uniqueId) || matchedCards.includes(card.image) ? 'revealed' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <img src={card.image} alt={`card-${card.uniqueId}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
