const express = require('express');
const cors = require('cors');
//------------
const routerIndex = require('./routes/routerIndex');
const initMongoDB = require('./utils/MongoDB');
//------------
const { handleError } = require('./utils/errors');

const { backendConf, frontendConf } = require('./config');

const app = express();
const port = backendConf.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:' + frontendConf.port,
    allowedHeaders: [
      'Access-Control-Allow-Headers',
      'Content-Type',
      'Authorization',
    ],
    optionsSuccessStatus: 204,
  })
);
//just checking if erroring worksTODO: delete this
app.get('/', (req, res, next) => {
  const err = {};
  err.message = 'Error without error';
  err.statusCode = 404;
  next(err);
});
app.use('/', routerIndex);
//Express error middleware
app.use((err, req, res, next) => {
  console.log('Are we getting an error? ', err);
  handleError(err, res);
});

initMongoDB();

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
