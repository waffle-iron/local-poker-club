'use strict'

const mongo = require('mongodb')
const client = mongo.MongoClient

module.exports = {
  connect() {
    client.connect('mongodb://localhost:27017/local-poker-club', (err) => {
      if (err) {
        console.log('ERROR: ' + err) // eslint-disable-line no-console
        process.exit(1)
      }

      console.log('Connected to Mongo') // eslint-disable-line no-console
    })
  },
}
