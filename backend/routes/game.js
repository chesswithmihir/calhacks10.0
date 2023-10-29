const express = require('express');
const TicTacToe = require('../models/TicTacToe');

const router = express.Router();

// Handle the 'new game' event
router.post('/new-game', async (req, res) => {
  const game = new TicTacToe();

  await game.save();

  res.send(game);
});

// Handle the 'move' event
router.post('/move', async (req, res) => {
  const { row, col } = req.body;

  const game = await TicTacToe.findOne({ _id: req.gameId });

  game.makeMove(row, col);

  await game.save();

  res.send(game);
});

// Handle the 'update score' event
router.post('/update-score', async (req, res) => {
  const { player1Score, player2Score } = req.body;

  const game = await TicTacToe.findOne({ _id: req.gameId });

  game.player1Score = player1Score;
  game.player2Score = player2Score;

  await game.save();

  res.sendStatus(200);
});

module.exports = router;
