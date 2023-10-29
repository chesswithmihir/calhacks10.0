const express = require('express');
const io = require('socket.io');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tic-tac-toe');

// Create a Socket.IO server
const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

const socket = io(server);

// Define the socket.io events
socket.on('connection', (socket) => {
  // Handle the 'new game' event
  socket.on('new game', async () => {
    const game = new TicTacToe();

    await game.save();

    socket.emit('game created', game);
  });

  // Handle the 'move' event
  socket.on('move', async (row, col) => {
    const game = await TicTacToe.findOne({ _id: socket.gameId });

    game.makeMove(row, col);

    await game.save();

    socket.emit('game state updated', game);
