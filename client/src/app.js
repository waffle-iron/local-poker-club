const angular = require('angular')
const uiRouter = require('angular-ui-router');

(function () {
  'use strict'

  angular
    .module('local-poker-club', [uiRouter])
    .run(['$rootScope', Run])

  function Run($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      console.log(`State Change: transition begins from ${fromState.url}/params${fromParams} to ${toState.url}/params${toParams}`)
    })

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      console.log("State Change: State change success!")
    })

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
      console.log("State Change: Error!")
    })

    $rootScope.$on('$stateNotFound', function(event, toState, toParams, fromState, fromParams) {
      console.log("State Change: State not found!")
    })

    $rootScope.$on('$viewContentLoading', function(event, viewConfig) {
      console.log("View Load: the view is loaded, and DOM rendered!")
    })

    $rootScope.$on('$viewContentLoaded', function(event, viewConfig) {
      console.log("View Load: the view is loaded, and DOM rendered!")
    })
  }
})()
