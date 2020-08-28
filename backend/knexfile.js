// Update with your config settings.
const { SQL } = require('./config');
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'mysql',
      port: SQL.port,
      user: SQL.user,
      password: SQL.password,
      database: SQL.dbName,
      charset: 'utf8',
    },
    pool: {
      afterCreate: function (conn, done) {
        conn.query('SELECT 1+1;', function (err) {
          if (err) {
            // first query failed, return error and don't try to make next query
            done(err, conn);
          } else {
            // do the second query...
            conn.query('SELECT 1+1;', function (err) {
              // if err is not falsy, connection is discarded from pool
              // if connection aquire was triggered by a query the error is passed to query promise
              done(err, conn);
            });
          }
        });
      },
    },
  },
};
