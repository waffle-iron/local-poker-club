(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* global angular */
(function () {
  'use strict';

  angular.module('local-poker-club').service('clubService', clubService);

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

    function get(clubName) {
      return $http.get('/clubs/get/' + clubName);
    }

    function put(club) {
      return $http.put('/clubs/put', { club: club });
    }
  }
})();

},{}]},{},[1]);
