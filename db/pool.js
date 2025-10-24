const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  sslmode: process.env.PGSSLMODE,
  channelbinding: process.env.PGCHANNELBINDING
})




module.exports = { pool }
