// db.js
const { Pool } = require('pg');
require('dotenv').config();

let pool;

// If DATABASE_URL is provided (Render production), use it
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Render
  });
  console.log('📦 Connecting to Render PostgreSQL database with DATABASE_URL');
} else {
  // Otherwise use individual environment variables
  pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'flipkart_db',
    password: process.env.DB_PASSWORD || 'tamanna1234',
    port: process.env.DB_PORT || 5432,
  });
  
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbName = process.env.DB_DATABASE || 'flipkart_db';
  console.log(`📦 Connecting to local database: ${dbHost}/${dbName}`);
}

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;