const express = require('express');
const PageNotFoundError = require('../errors/PageNotFoundError');
const { body, validationResult } = require('express-validator')
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
  body('name').trim().isLength({ min: 1}).withMessage('Name is required').run(req)

  const user = req.body.name
  const text = req.body.text
  const added = new Date()


  messages.push({ id: messages[messages.length - 1].id + 1, user, text, added })

  res.redirect('/')
})

indexRouter.get('/*splat', (req, res, next) => {
  if (req.params.splat.includes('messages')) {
    return next()
  }
  throw new PageNotFoundError('Page Not Found')
})


module.exports = { indexRouter, messages }
