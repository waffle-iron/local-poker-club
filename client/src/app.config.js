(function () {
  angular // eslint-disable-line no-undef
    .module('local-poker-club')
    .config(['$stateProvider', '$urlRouterProvider', Config])

  function Config($stateProvider, $urlRouterProvider) {
    const homeState = {
      name: 'home',
      url: '/',
      templateUrl: '../src/views/clubs/create.html',
      controller: 'clubController',
      controllerAs: 'c',
    }

    const clubCreate = {
      name: 'clubCreate',
      url: '/create',
      template: '<h1>New Club</h1>',
    }

    $stateProvider.state(homeState)
    $stateProvider.state(clubCreate)

    $urlRouterProvider.otherwise('/api/Projects')
  }
}())
