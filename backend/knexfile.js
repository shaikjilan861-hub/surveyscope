require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'database-1.cxoy2uuyax4t.eu-north-1.rds.amazonaws.com',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'Peerbrains',
      database: process.env.DB_NAME || 'postgres',
       ssl: {
    rejectUnauthorized: false,
  },
    },
   migrations: {
  directory: './src/migrations',
},
seeds: {
  directory: './src/seeds',
},
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/migrations',
    },
  },
};