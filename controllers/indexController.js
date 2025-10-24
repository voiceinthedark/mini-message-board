const { body, validationResult, matchedData } = require('express-validator');
const { getAllMessages, insertMessage } = require('../db/queries')

const validationRules = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('text').trim().isLength({ min: 1 }).withMessage('Message text is required')
]


const getIndex = async (req, res) => {
  const messages = await getAllMessages()
  console.log(messages)
  res.render('index', { title: "Message Board", messages: messages })
}

const getNewMessage = (req, res) => {
  res.render('form')
}

const postNewMessage = [
  validationRules,
  async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.render('form', { errors: errors.array() })
    }

    const { name, text } = matchedData(req)
    const added = new Date()
    
    // insert into the database here
    // messages.push({ id: messages[messages.length - 1].id + 1, user, text, added })
    await insertMessage(name, text)
    
    res.redirect('/')
  }]

module.exports = { getIndex, getNewMessage, postNewMessage }
