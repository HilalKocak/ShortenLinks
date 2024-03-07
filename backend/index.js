const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const mongoose = require("mongoose");

require('./mongo-connection')


const app = express()
app.use(bodyParser.json())
app.use(cors())
app.set('view engine', 'pug')


module.exports = app

