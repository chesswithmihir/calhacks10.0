import React, { useState, useEffect } from 'react';
import './styles.css';
import { connectToDatabase, saveGameState, getGameState } from './database';

await connectToDatabase();

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((value, i) => (
        <Square key={i} value={value} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

const Game = () => {
  const [boardState, setBoardState] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handleClick = (i) => {
    if (boardState[i] === null) {
      const newBoardState = [...boardState];
      newBoardState[i] = currentPlayer;

      setBoardState(newBoardState);
      currentPlayer === 'X' ? setCurrentPlayer('O') : setCurrentPlayer('X');
    }
  };

  return (
    <div className="game">
      <Board squares={boardState} onClick={handleClick} />
    </div>
  );
};

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));

  useEffect(async () => {
    const gameState = await getGameState();
    if (gameState) {
      setSquares(gameState.boardState);
    }
  }, []);

  return (
    <div className="app">
      <Game />
    </div>
  );
};

export default App;

