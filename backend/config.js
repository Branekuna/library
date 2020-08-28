const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  backendConf: {
    port: process.env.BACKEND_PORT,
  },
  frontendConf: {
    port: process.env.FRONTEND_PORT,
  },
  SQL: {
    port: process.env.SQL_PORT,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    dbName: process.env.SQL_DB_NAME,
  },
  MongoDB: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DB_NAME,
  },
  secretSaltGen: process.env.SECRET_SALT_GEN,
};
