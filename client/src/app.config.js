(function () {
  angular // eslint-disable-line no-undef
    .module('local-poker-club')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', Config])

  function Config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true)

    const homeState = {
      name: 'home',
      url: '/',
      template: '<div class="btn btn-primary" ui-sref="clubsList">Clubs</div>',
    }

    const clubsListState = {
      name: 'clubsList',
      url: '/clubs',
      templateUrl: '../src/views/clubs/index.html',
      controller: 'clubController',
      controllerAs: 'c',
    }

    const clubCreate = {
      name: 'clubsCreate',
      url: '/create',
      template: '<h1>New Club</h1>',
    }

    $stateProvider.state(homeState)
    $stateProvider.state(clubsListState)
    $stateProvider.state(clubCreate)

    //$urlRouterProvider.otherwise('/api/Projects')
  }
}())
