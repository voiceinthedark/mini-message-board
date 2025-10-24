const dotenv = require('dotenv')
const path = require('node:path')
const express = require('express')
const app = express()

// Load environment variables from .env file
dotenv.config()

const { indexRouter } = require('./routes/indexRoutes')
const messageRouter = require('./routes/messageRouter')

// Set the view engine to EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


// Setup middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/', indexRouter)
app.use('/messages', messageRouter)

// PORT
const PORT = process.env.PORT || 5000

app.use((error, req, res, next) => {
  console.error(error.stack)
  res.status(500).render('500', { title: "500: Internal Server Error" })
})

// Start server on port
app.listen(PORT, (error) => {
  if (error) console.error(error.message);
  console.log(`Server running on port ${PORT}`)
})
