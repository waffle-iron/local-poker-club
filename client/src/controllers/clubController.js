/* global angular */
(function () {
  'use strict';

  angular
    .module('local-poker-club')
    .controller('clubController', clubController);

  clubController.$inject = ['$state', '$scope', 'clubService'];

  function clubController($state, $scope, clubService) {
    getClubs();
    
    return {
      message: 'Hey!',
      clubs: getClubs(),
      create: create
    };

    function getClubs() {
      clubService.get('*', promise => {
        promise.then(allClubs => {
          if (allClubs.status === 200) {
            $scope.fuckyou = allClubs.data;
          }
        });
      });
    }

    function create(club) {
      const clubObj = {
        clubName: club.clubName,
        owner: club.owner,
      };

      clubService.post(clubObj)
        .then(response => {
          if (response.status === 201) {
            $state.go('clubsList', { message: `Club ${clubObj.clubName} was created successfully` });
          }
        });
    }

  }
})();
