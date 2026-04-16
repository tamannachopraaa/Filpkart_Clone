// db.js
const { Pool } = require('pg');
require('dotenv').config();

// Use DATABASE_URL if available (Render), otherwise build from individual vars
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'flipkart_db',
  password: process.env.DB_PASSWORD || 'tamanna1234',
  port: process.env.DB_PORT || 5432,
});

// Log connection info (without password)
const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_DATABASE || 'flipkart_db';
console.log(`📦 Connecting to database: ${dbHost}/${dbName}`);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;