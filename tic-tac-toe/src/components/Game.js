import React, { useState } from 'react';
import Board from './Board';

function Game() {
  const [gameState, setGameState] = useState({
    board: '',
    currentPlayer: 'X',
  });

  const makeMove = (row, col) => {
    const newBoard = gameState.board.split('');

    newBoard[row * 3 + col] = gameState.currentPlayer;

    setGameState({
      board: newBoard.join(''),
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
    });
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board board={gameState.board} makeMove={makeMove} />
    </div>
  );
}

export default Game;

