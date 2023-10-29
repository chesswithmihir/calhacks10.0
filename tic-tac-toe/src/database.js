import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

async function connectToDatabase() {
  await client.connect();
}

async function saveGameState(boardState, playerXScore, playerOScore) {
  const database = client.db('my-database');
  const collection = database.collection('game-state');

  await collection.insertOne({
    boardState,
    playerXScore,
    playerOScore,
  });
}

async function getGameState() {
  const database = client.db('my-database');
  const collection = database.collection('game-state');

  const document = await collection.findOne();

  return document;
}

export { connectToDatabase, saveGameState, getGameState };

