// const { PORT } = require('./common/config');
require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT;
const connectionDB = require('./db/db.client');

connectionDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
