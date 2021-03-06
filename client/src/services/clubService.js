/* global angular */
(function () {
  'use strict';

  angular
    .module('local-poker-club')
    .service('clubService', clubService);

  clubService.$inject = ['$http'];

  function clubService($http) {
    return {
      post: post,
      get: get,
      put: put
    };

    function post(club) {
      return $http.post('/clubs/post', { club: club });
    }

    function get(clubName, done) {
      if (clubName === '*') {
        // GET All
        done($http.get('/clubs/get'));
      }
      else {
        // GET One
        done($http.get('/clubs/get/' + clubName));
      }
    }

    function put(club) {
      return $http.put('/clubs/put', { club: club });
    }
  }
})();
