/* global angular */
(function () {
  'use strict'

  angular
    .module('local-poker-club')
    .controller('clubController', clubController)

  clubController.inject = ['$http', '$q']

  function clubController($http, $q) {
    return {
      create,
    }

    function create() {
      // dataService.createClub();

      const deferred = $q.defer()
      $http.post('/clubs/create')
        .success((data) => {
          return deferred.resolve(data)
        })

      return deferred.promise
    }
  }
})()
