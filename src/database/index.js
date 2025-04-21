const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5434,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'mybooks',
});

client.connect();

exports.query = async (query, values) => {
    const { rows } = await client.query(query, values);
    return rows;
}
