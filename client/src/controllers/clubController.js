/* global angular */
(function () {
  'use strict'

  angular
    .module('local-poker-club')
    .controller('clubController', clubController)

  clubController.$inject = ['$state', 'clubService']

  function clubController($state, clubService) {
    return {
      create: create
    }

    function create(club) {
      const clubObj = {
        clubName: club.clubName,
        owner: club.owner,
      }

      clubService.post(clubObj)
        .then(response => {
          if (response.status === 201) {
            $state.go('clubsList', { message: `Club ${clubObj.clubName} was created successfully` })
          }
        })
    }
  }
})()
