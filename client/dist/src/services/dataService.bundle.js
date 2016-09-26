(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* global angular */
(function () {
  'use strict';

  angular.module('local-poker-club').service('dataService', dataService);

  dataService.$inject = ['$http', '$q', '$log'];

  function dataService($http, $q, $log) {
    return {
      createClub: createClub,
      fetchClub: fetchClub
    };

    function createClub(club) {
      var deferred = $q.defer();

      return validateClub(club).then(create, handleError);

      function create(validationResult) {
        if (validationResult.result === false) {
          $http.post('/clubs/add', { club: club }).then(success, error);
        } else {
          throw 'Club Name already exists, please choose another name';
        }
      }

      function handleError(err) {
        console.log(err);
        $log(err);
      }

      function success(response) {
        return deferred.resolve(response);
      }

      function error(err) {
        console.log(err);
        return deferred.resolve(err);
      }
    }

    function validateClub(club) {
      if (!club) return { result: false, reason: 'Missing club' };
      if (!club.clubName) return { result: false, reason: 'Missing clubName' };
      if (!club.owner) return { result: false, reason: 'Missing owner' };

      var def = $q.defer();
      return fetchClub(club.clubName).then(function (club) {
        var existingClub = club;
        if (existingClub) return { result: false, reason: 'Club already exists. Choose another Club Name' };
        return { result: true };
      }, function (err) {
        $log(err);
      });
    }

    function fetchClub(clubName) {
      var def = $q.defer();
      $http.get('/clubs/fetch/' + clubName).then(function (club) {
        def.resolve(club);
      }, function (err) {
        $log.error(err);
        def.reject('Failed to get club');
      });

      return def.promise;
    }
  }
})();

},{}]},{},[1]);
