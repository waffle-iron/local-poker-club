(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* global angular */
(function () {
  'use strict';

  angular.module('local-poker-club').controller('clubController', clubController);

  clubController.$inject = ['$state', '$scope', 'clubService'];

  function clubController($state, $scope, clubService) {
    getClubs();

    return {
      message: 'Hey!',
      clubs: getClubs(),
      create: create
    };

    function getClubs() {
      clubService.get('*', function (promise) {
        promise.then(function (allClubs) {
          if (allClubs.status === 200) {
            $scope.fuckyou = allClubs.data;
          }
        });
      });
    }

    function create(club) {
      var clubObj = {
        clubName: club.clubName,
        owner: club.owner
      };

      clubService.post(clubObj).then(function (response) {
        if (response.status === 201) {
          $state.go('clubsList', { message: 'Club ' + clubObj.clubName + ' was created successfully' });
        }
      });
    }
  }
})();

},{}]},{},[1]);
