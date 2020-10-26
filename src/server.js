// const { PORT } = require('./common/config');
const logger = require('./logger/logger');
require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT;
const connectionDB = require('./db/db.client');

connectionDB(() => {
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
