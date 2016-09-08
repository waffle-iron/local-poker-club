'use strict'

let express = require('express')
let mongoUtil = require('./mongoUtil')
let bodyParser = require('body-parser')
let app = express()

mongoUtil.connect()

app.use(express.static(__dirname + '/../client'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(8181, () => console.log('Listening on port 8181')) //eslint-disable-line no-console
