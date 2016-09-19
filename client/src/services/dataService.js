/* global angular */
(function () {
  'use strict'

  angular
    .module('local-poker-club')
    .service('dataService', dataService)

  dataService.$inject = ['$http', '$q']

  function dataService($http, $q) {
    return {
      createClub: createClub
    }

    function createClub(club) {
      let deferred = $q.defer()

      $http.post('/clubs/add', { club: club }).then(success, error)

      function success(response) {
        return deferred.resolve(response)
      }

      function error(err) {
        console.log( 'failure message: ' + err) // eslint-disable-line no-console
      }

      return deferred.promise

    }
  }
})()
