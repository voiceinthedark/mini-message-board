const path = require('node:path')
const express = require('express')
const app = express()

const indexRouter = require('./routes/indexRoutes')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))

app.use('/', indexRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, (error) => {
  if(error) console.error(error.message);
console.log(`Server running on port ${PORT}`)
})
