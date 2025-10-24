const express = require('express');
const indexRouter = express.Router()
const PageNotFoundError = require('../errors/PageNotFoundError');
const indexController = require('../controllers/indexController')

indexRouter.get('/', indexController.getIndex)
indexRouter.get('/new', indexController.getNewMessage)
indexRouter.post('/new', indexController.postNewMessage)
indexRouter.get('/*splat', (req, res, next) => {
  if (req.params.splat.includes('messages')) {
    return next()
  }
  throw new PageNotFoundError('Page Not Found')
})


module.exports = { indexRouter }
