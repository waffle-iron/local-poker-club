/* global ngModule inject */
'use strict'

require('../../client/dist/src/services/dataService.bundle')

const chai = require('chai')
const spies = require('chai-spies')

chai.use(spies)
const expect = chai.expect

let response

describe('data service', () => {
  beforeEach(ngModule('local-poker-club'))

  let $httpBackend, dataService

  beforeEach(inject(($injector) => {
    dataService = $injector.get('dataService')
    $httpBackend = $injector.get('$httpBackend')
  }))

  describe('when instantiated', () => {
    it('should contain a \'createClub\' method', () => {
      expect(dataService).to.not.be.undefined
      expect(dataService.createClub).to.not.be.undefined
    })
  })

  describe('when creating a new club, ', () => {
    beforeEach(() => {
      const newClub = {
        clubName: 'Club Foo',
        owner: 'foo@bar.com',
      }

      $httpBackend
        .when('POST', '/clubs/add')
        .respond(201, {_id:'1', clubName: 'Club Foo', owner: 'foo@bar.com'})

      dataService.createClub(newClub).then(data => {
        response = data
      })

      $httpBackend.flush()
    })

    it('should respond with status 201', () => {
      expect(response.status).to.equal(201)
    })

    it('should contain the new club in the response', () => {
      expect(response.data).to.not.be.undefined
      expect(response.data._id).to.equal('1')
      expect(response.data.clubName).to.equal('Club Foo')
      expect(response.data.owner).to.equal('foo@bar.com')
    })

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()
    })
  })

  ////// it should handle bad data
  ////// it should handle undefined club
  ////// it should not allow the creation of an club that exists by name

})
