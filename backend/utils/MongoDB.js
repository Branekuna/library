const mongoose = require('mongoose');
const { MongoDB } = require('../config');

module.exports = () => {
  mongoose
    .connect(
      `mongodb://${MongoDB.user}:${MongoDB.password}@mongo:27017/${MongoDB.dbName}?authSource=admin`,
      { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }
    )
    .then(() => {
      console.log('Great success! Connected with mongoDB microservice');
    })
    .catch((err) => {
      console.log('Error while connecting to mongoDB during init ', err);
    });
};
