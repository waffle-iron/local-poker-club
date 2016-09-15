(function() {
  'use strict'

  angular
    .module('local-poker-club')
    .controller('clubController', clubController)

  clubController.inject = ['$http', '$q']

  function clubController($http, $q) {
    return {
      create: create
    }

    function create() {
      // dataService.createClub();

      var deferred = $q.defer()
      $http.post('/clubs/create')
        .success(function(data) {
          return deferred.resolve(data)
        })

      return deferred.promise
    }
  }
})()
