const { Pool } = require("pg");
require("dotenv").config();



const pool = new Pool({
    /*for local development
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,*/

    //for deployment
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // This is required for many cloud-hosted Postgres instances.
    }
  });
  
  module.exports = pool;
  