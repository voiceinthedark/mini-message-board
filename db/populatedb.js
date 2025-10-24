#! /usr/bin/env node

require('dotenv').config()
const { Client } = require('pg')

async function populateDB() {
  const client = new Client({
    // connectionString: process.env.DATABASE_URL,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    sslmode: process.env.PGSSLMODE,
    channelbinding: process.env.PGCHANNELBINDING
  })

  try {
    await client.connect()

    console.log(`Connecting to database...`)
    console.log(`Connection string: ${process.env.DATABASE_URL}`)

    const dbInfo = await client.query('SELECT current_database(), current_user')
    console.log('Connected to DB:', dbInfo.rows[0])


    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        text TEXT,
        "user" VARCHAR(255),
        added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `
    await client.query(createTableQuery)

    const insertMessagesQuery = `
      INSERT INTO messages (text, "user", added) VALUES
      ('Hi there!', 'Amando', NOW()),
      ('Hello World!', 'Charles', NOW());
    `
    const result = await client.query(insertMessagesQuery)
    console.log(`${result.rowCount} rows inserted.`)

    console.log('Database populated successfully.')
    await client.end()
  }
  catch (err) {
    console.error('Error populating database:', err)
  }
}

populateDB()
