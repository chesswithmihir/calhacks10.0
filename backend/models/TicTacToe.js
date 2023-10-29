const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TicTacToeSchema = new Schema({
  player1Score: { type: Number, default: 0 },
  player2Score: { type: Number, default: 0 },
  boardState: { type: String, default: '' },
});

module.exports = mongoose.model('TicTacToe', TicTacToeSchema);
