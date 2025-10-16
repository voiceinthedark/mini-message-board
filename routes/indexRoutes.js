const express = require('express')
const indexRouter = express.Router()

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

indexRouter.get('/', (req, res) => {
  res.render('index', { title: "Message Board", messages: messages })
})

indexRouter.get('/new', (req, res) => {
  res.render('form')
})

indexRouter.post('/new', (req, res) => {
  const user = req.body.name
  const text = req.body.text
  const added = new Date()

  messages.push({ id: messages[messages.length - 1].id + 1, user, text, added })

  res.redirect('/')
})


module.exports = { indexRouter, messages}
