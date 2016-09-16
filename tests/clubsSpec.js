/* global ngModule inject */
'use strict'

require('../client/src/clubController')

describe('club controller', () => {
  beforeEach(ngModule('local-poker-club'))

  let $controller, $httpBackend
  const expect = require('chai').expect

  beforeEach(inject((_$controller_, _$httpBackend_) => {
    $controller = _$controller_
    $httpBackend = _$httpBackend_
  }))

  describe('create new club', () => {
    let controller

    beforeEach(() => {
      controller = $controller('clubController')
    })

    it('contains a function called "create"', () => {
      expect(controller.create).to.not.be.undefined
    })

    it('returns 201 status code', () => {
      $httpBackend.when('POST', '/clubs/create')
        .respond({ 'status': 201, 'club': { clubId: 1, clubName: 'Club Foo', owner: 'foo@bar.com' } })

      let statusCode

      controller.create().then((data) => {
        statusCode = data.status
      })

      $httpBackend.flush()

      expect(statusCode).to.equal(201)
    })

    it('should create a new club', () => {
      const expected = { clubId: 1, clubName: 'Club Foo', owner: 'foo@bar.com' }

      $httpBackend.when('POST', '/clubs/create')
        .respond(201, { clubId: 1, clubName: 'Club Foo', owner: 'foo@bar.com' })

      let response

      controller.create().then((data) => {
        response = data
      })

      $httpBackend.flush()

      expect(response).to.deep.equal(expected)
    })
  })
})
