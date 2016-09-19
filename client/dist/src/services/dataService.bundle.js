(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* global angular */
(function () {
  'use strict';

  angular.module('local-poker-club').service('dataService', dataService);

  dataService.$inject = ['$http', '$q'];

  function dataService($http, $q) {
    return {
      createClub: createClub
    };

    function createClub(club) {
      var deferred = $q.defer();

      $http.post('/clubs/add', { club: club }).then(success, error);

      function success(response) {
        return deferred.resolve(response);
      }

      function error(err) {
        console.log('failure message: ' + err); // eslint-disable-line no-console
      }

      return deferred.promise;
    }
  }
})();

},{}]},{},[1]);
