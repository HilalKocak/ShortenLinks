if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
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
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.session())
app.use('/links', linksRouter)
app.use('/users', usersRouter)
app.use('/categories', categoriesRouter)
app.use('/', indexRouter)

module.exports = app