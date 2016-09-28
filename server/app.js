'use strict'

const express = require('express')
const mongoUtil = require('./mongoUtil')
const bodyParser = require('body-parser')
const app = express()

mongoUtil.connect()

app.use(express.static(__dirname + '/../client'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/clubs/get/:clubName', (request, response) => {
  console.log('bingo')
  const clubName = request.params.clubName
  if (!clubName) { response.sendStatus(400) }

  const clubs = mongoUtil.clubs()
  let existingClub = clubs.find({clubName: clubName})

  if (!existingClub) { response.sendStatus(404) }
 console.log(existingClub)
  response.sendStatus(200)
  response.body = existingClub
})

app.post('/clubs/post', (request, response) => {
  const club = request.body.club
  console.log('inserting bluc')
  console.log(club)
  const clubs = mongoUtil.clubs()
  clubs.insert(club).then(data => {
    if (data.insertedCount === 1) {
      response.sendStatus(201)
      console.log(201)
    }
    else {
      console.log(500)
      response.sendStatus(500)
    }
  }, err => {
    console.log(err)
  })

  app.put('/clubs/put', (request, response) => {
    const club = request.body.club
    const clubs = mongoUtil.clubs()
    clubs.update(
      { _id: club._id },
      club
    ).then(data => {
      if (data.modifiedCount === 1) {
        response.sendStatus(200)
      }
      else {
        response.sendStatus(500)
      }
    })
  })
})

app.listen(8181, () => console.log('Listening on port 8181')) // eslint-disable-line no-console
