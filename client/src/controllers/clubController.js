/* global angular */
(function () {
  'use strict'

  angular
    .module('local-poker-club')
    .controller('clubController', clubController)

  clubController.$inject = ['clubService']

  function clubController(clubService) {
    return {
      create: create
    }

    function create(club) {
      return clubService.post(club)
    }
  }
})()
