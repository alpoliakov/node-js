const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.MONGO_CONNECTION_STRING;

const connectionDB = cb => {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log('We are connecting');
    await db.dropDatabase(() => {
      console.log('Database dropped');
      cb();
    });
  });
};

module.exports = connectionDB;
