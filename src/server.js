const logger = require('./logger/logger');
process
  .on('uncaughtException', err => {
    logger.error({
      name: 'uncaughtException',
      message: err.message
    });
    const { exit } = process;
    logger.on('finish', () => exit(1));
  })
  .on('unhandledRejection', err => {
    logger.error({
      name: 'unhandledRejection',
      message: err.message
    });
    const { exit } = process;
    logger.on('finish', () => exit(1));
  });

require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT;
const connectionDB = require('./db/db.client');

connectionDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
