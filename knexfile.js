// Update with your config settings.
const path = require('path');

module.exports = {

  
  development: {
    client: 'pg',
    connection: {
      database: 'modulo02',
      user:     'postgres',
      password: '3010'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }
  }

};
