const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const handlerError = require('./errors/handlerError');
const { NOT_FOUND } = require('http-status-codes');
const createError = require('http-errors');
const logRequest = require('./utils/logRequest');
const startServer = require('./utils/startServer');
const helmet = require('helmet');
const cors = require('cors');

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
app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use(handlerError);

module.exports = app;
