const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.uncolorize(),
    format.json(),
    format.prettyPrint()
  ),
  transports: [
    new transports.Console({
      level: 'error'
    }),
    new transports.File({
      filename: './src/logger/request.log',
      level: 'info'
    }),
    new transports.File({
      filename: './src/logger/errors.log',
      level: 'error'
    })
  ]
});

module.exports = logger;
