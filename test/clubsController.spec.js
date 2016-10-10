/* global ngModule inject */
'use strict'

require('../client/dist/src/controllers/clubController.bundle')
require('../client/dist/src/services/clubService.bundle')

const chai = require('chai')
const spies = require('chai-spies')

chai.use(spies)
const expect = chai.expect

describe('club controller', () => {
  beforeEach(ngModule('local-poker-club'))

  let $controller

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_
  }))

  describe('when instantiated', () => {
    it('should contain a \'create\' method', () => {
      const controller = $controller('clubController')

      expect(controller).to.not.be.undefined
      expect(controller.create).to.not.be.undefined
    })
  })

  describe('when creating a new club, ', () => {
    let controller
    let clubService

    beforeEach(inject(_clubService_ => {
      clubService = _clubService_
    }))

    beforeEach(() => {
      controller = $controller('clubController')
    })

    it('should call the club service', () => {
      const spy = chai.spy.on(clubService, 'post')

      controller.create({clubName: 'Club Foo', owner: 'foo@bar.com'})

      expect(spy).to.be.spy
      expect(spy).to.have.been.called()
    })

  })

  //// when creating a new club
  ////// it should contain the new club on the view model
  ////// it should handle bad data
  ////// it should handle undefined club
  ////// it should not allow the creation of an club that exists by name

})
