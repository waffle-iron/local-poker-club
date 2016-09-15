require('../client/src/clubController');


describe('club controller', function() {
  beforeEach(ngModule('local-poker-club'));

  var $controller, $httpBackend;
  var chai = require('chai');
  var expect = chai.expect;

  beforeEach(inject(function(_$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));

  describe('create new club', function() {

    var controller;

    beforeEach(function() {
      controller = $controller('clubController');
    });

    it('contains a function called "create"', function() {
      expect(controller.create).to.not.be.undefined;
    })

    it('returns 201 status code', function() {
      $httpBackend.when('POST', '/clubs/create')
        .respond({'status': 201, 'club': {clubId:1, clubName:'Club Foo', owner:'foo@bar.com'}});

      var statusCode;

      controller.create().then(function(data) {
        statusCode = data.status;
      });

      $httpBackend.flush();

      expect(statusCode).to.equal(201);
    })

    it('should create a new club', function() {
      var expected = {clubId:1, clubName:'Club Foo', owner:'foo@bar.com'};

      $httpBackend.when('POST', '/clubs/create')
        .respond(201, {clubId:1, clubName:'Club Foo', owner:'foo@bar.com'});

      var response;

      controller.create().then(function(data) {
        response = data;
      });

      $httpBackend.flush();

      expect(response).to.deep.equal(expected);
    })
  })
})
