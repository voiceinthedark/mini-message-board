const express = require('express')
const app = express()

const indexRouter = require('./routes/indexRoutes')

app.use('/', indexRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, (error) => {
  if(error) console.error(error.message);
console.log(`Server running on port ${PORT}`)
})
