(function() {
  'use strict'

  angular
    .module('local-poker-club')
    .controller('clubController', clubController)

  function clubController() {
    return {
      create: create
    }

    function create() {
      return '200';
    }
  }
})()
