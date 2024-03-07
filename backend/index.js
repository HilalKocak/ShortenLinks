const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");

require('./mongo-connection')

const linksRouter = require('./routes/links')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const categoriesRouter = require('./routes/category')

const app = express()
app.use(bodyParser.json())

app.use(cors())
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false }))


app.use('/links', linksRouter)
app.use('/users', usersRouter)
app.use('/categories', categoriesRouter)
app.use('/', indexRouter)

module.exports = app