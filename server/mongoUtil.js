'use strict';

var mongo = require('mongodb');
var client = mongo.MongoClient;
var _db;

module.exports = {
  connect: function connect() {
    client.connect('mongodb://localhost:27017/local-poker-club', function (err, db) {
      if (err) {
        console.log('ERROR: ' + err); // eslint-disable-line no-console
        //process.exit(1);
      }

      _db = db;
      console.log('Connected to Mongo'); // eslint-disable-line no-console
      console.log(db);
    });
  },
  clubs: function clubs() {
    return _db.collection('clubs');
  }
};
