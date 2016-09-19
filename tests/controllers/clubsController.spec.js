/* global ngModule inject */
'use strict'

require('../../client/dist/src/clubController.bundle')
require('../../client/dist/src/services/dataService.bundle')

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
    let dataService

    beforeEach(inject(_dataService_ => {
      dataService = _dataService_
    }))

    beforeEach(() => {
      controller = $controller('clubController')
    })

    it('should call the data service', () => {
      const spy = chai.spy.on(dataService, 'createClub')

      controller.create()

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
