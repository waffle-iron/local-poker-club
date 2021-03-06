'use strict';

import express from 'express';
import mongoUtil from './mongoUtil';
import clubs from './clubs';
import  bodyParser from 'body-parser';
const app = express();

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/clubs/get', (request, response) => {
  clubs.getAll(allClubs => {
    console.log('all clubs', allClubs);
    if (!allClubs) {
      response.sendStatus(404);
    }
    else {
      response.status(200).json(allClubs);
    }
  });
});

app.get('/clubs/get/:clubName', function (request, response) {
  console.log('in here');
  var clubName = request.params.clubName;
  if (!clubName) {
    response.sendStatus(400);
  }

  var clubs = mongoUtil.clubs();
  var existingClub = clubs.find({ clubName: clubName });

  if (!existingClub) {
    response.sendStatus(404);
  }
  console.log(existingClub);
  response.sendStatus(200);
  response.body = existingClub;
});

app.post('/clubs/post', function (request, response) {
  var club = request.body.club;
  console.log('inserting bluc');
  console.log(club);
  var clubs = mongoUtil.clubs();
  clubs.insert(club).then(function (data) {
    if (data.insertedCount === 1) {
      response.sendStatus(201);
      console.log(201);
    } else {
      console.log(500);
      response.sendStatus(500);
    }
  }, function (err) {
    console.log(err);
  });

  app.put('/clubs/put', function (request, response) {
    var club = request.body.club;
    var clubs = mongoUtil.clubs();
    clubs.update({ _id: club._id }, club).then(function (data) {
      if (data.modifiedCount === 1) {
        response.sendStatus(200);
      } else {
        response.sendStatus(500);
      }
    });
  });
});

app.listen(8181, function () {
  return console.log('Listening on port 8181');
}); // eslint-disable-line no-console

process.on('SIGTERM', () => {
  app.close(() => {
    process.exit(0);
  });
});
