const path = require('node:path')
const express = require('express')
const app = express()

const { indexRouter } = require('./routes/indexRoutes')
const messageRouter = require('./routes/messageRouter')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/', indexRouter)
app.use('/messages', messageRouter)

// PORT
const PORT = process.env.PORT || 5000

// Start server on port
app.listen(PORT, (error) => {
  if (error) console.error(error.message);
  console.log(`Server running on port ${PORT}`)
})
