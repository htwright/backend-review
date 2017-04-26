const env = require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;

exports.DATABASE = {
  client: 'pg',
  connection: DATABASE_URL,
  debug: true
};

exports.PORT = process.env.PORT || 8080;
