const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.MONGO_CONNECTION_STRING;
const logger = require('../logger/logger');

const connectionDB = cb => {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;

  db.on('error', () => logger.error('DB connection error:'));
  db.once('open', async () => {
    logger.info('We are connecting');
    await db.dropDatabase(() => {
      logger.info('Database dropped!');
      cb();
    });
  });
};

module.exports = connectionDB;
