#! /usr/bin/env node

const { Client } = require('pg')

async function populateDB() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })

  try{
    await client.connect()

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        text TEXT,
        user VARCHAR(255),
        added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `
    await client.query(createTableQuery)

    const insertMessagesQuery = `
      INSERT INTO messages (user, text, added) VALUES
      ('Hi there!', 'Amando', NOW()),
      ('Hello World!', 'Charles', NOW());
    `
    await client.query(insertMessagesQuery)

    console.log('Database populated successfully.')
    await client.end()
  }
  catch(err){
    console.error('Error populating database:', err)
  }
}

populateDB()
