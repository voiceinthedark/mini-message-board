const { pool } = require('./pool')

const getAllMessages = async () => {
  const res = await pool.query('SELECT * FROM messages')
  return res.rows
}

const insertMessage = async (user, text) => {
  const res = await pool.query(
    'INSERT INTO messages ("user", text, added) VALUES ($1, $2, NOW()) RETURNING *',
    [user, text]
  )
  return res.rows[0]
}

module.exports = { getAllMessages, insertMessage }
