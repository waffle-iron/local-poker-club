(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  angular // eslint-disable-line no-undef
  .module('local-poker-club').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', Config]);

  function Config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    var homeState = {
      name: 'home',
      url: '/',
      templateUrl: '../src/views/clubs/create.html',
      controller: 'clubController',
      controllerAs: 'c'
    };

    var clubCreate = {
      name: 'clubCreate',
      url: '/create',
      template: '<h1>New Club</h1>'
    };

    $stateProvider.state(homeState);
    $stateProvider.state(clubCreate);

    $urlRouterProvider.otherwise('/api/Projects');
  }
})();

},{}]},{},[1]);
