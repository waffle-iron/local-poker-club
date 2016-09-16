'use strict'

const express = require('express')
const mongoUtil = require('./mongoUtil')
const bodyParser = require('body-parser')
const app = express()

mongoUtil.connect()

app.use(express.static(__dirname + '/../client'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(8181, () => console.log('Listening on port 8181')) // eslint-disable-line no-console
