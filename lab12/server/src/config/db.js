const mongoose = require('mongoose');

let memoryServer = null;

async function connectDB() {
  const useMemory = String(process.env.USE_MEMORY_DB || '').toLowerCase() === 'true';

  let uri = process.env.MONGODB_URI;

  if (useMemory || !uri) {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri('digivault');
    console.log('MongoDB Memory Server:', uri);
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
}

async function disconnectDB() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}

module.exports = { connectDB, disconnectDB };
