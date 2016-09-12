(function() {
  'use strict'

  angular // eslint-disable-line no-undef
    .module('local-poker-club')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', Config])

  function Config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })

    const homeState = {
      name: 'home',
      url: '/',
      template: '<h1>hello world!</h1><div ng-controller="clubController as c"><div>{{c.create()}}</div></div>',
      controller: 'clubController',
      controllerAs: 'c'
    }

    const clubCreate = {
      name: 'clubCreate',
      url: '/create',
      template: '<h1>New Club</h1>'
    }

    $stateProvider.state(homeState)
    $stateProvider.state(clubCreate)

    $urlRouterProvider.otherwise('/api/Projects')
  }

})()
