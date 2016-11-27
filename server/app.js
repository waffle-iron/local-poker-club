'use strict';

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import mongoUtil from './mongoUtil';
import bodyParser from 'body-parser';

const port = 8181;
const app = express();
const compiler = webpack(config);

mongoUtil.connect();

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../client/index.html'));
});

app.get('/clubs/get/:clubName', function (request, response) {
  var clubName = request.params.clubName;
  if (!clubName) {
    response.sendStatus(400);
  }

  var clubs = mongoUtil.clubs();
  var existingClub = clubs.find({ clubName: clubName });

  if (!existingClub) {
    response.sendStatus(404);
  }
  response.sendStatus(200);
  response.body = existingClub;
});

app.post('/clubs/post', function (request, response) {
  var club = request.body.club;
  var clubs = mongoUtil.clubs();
  clubs.insert(club).then(function (data) {
    if (data.insertedCount === 1) {
      response.sendStatus(201);
    } else {
      response.sendStatus(500);
    }
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

  app.listen(port, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Will open it');
      open(`http://localhost:${port}`);
    }
  });
});
