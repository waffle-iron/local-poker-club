/* global angular */
(function () {
  'use strict'

  angular
    .module('local-poker-club')
    .controller('clubController', clubController)

  clubController.$inject = ['dataService']

  function clubController(dataService) {
    return {
      create: create
    }

    function create(club) {
      return dataService.createClub(club)
    }
  }
})()
