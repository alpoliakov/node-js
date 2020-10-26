const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const handlerError = require('./errors/handlerError');
const logger = require('./logger/logger');
const logRequest = require('./utils/logRequest');
const startServer = require('./utils/startServer');
const helmet = require('helmet');
const cors = require('cors');

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

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', startServer);

app.use(logRequest);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);
app.use('*', (req, res) => res.status(404).send('No such page exists!'));
app.use(handlerError);

module.exports = app;
