const express = require('express')
const messageRouter = express.Router()

const { messages } = require('./indexRoutes')

messageRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const message = messages.find(m => m.id === +id)

  res.render('message', { message })
})

module.exports = messageRouter
