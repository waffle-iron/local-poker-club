/* global ngModule inject */
'use strict';

require('../client/dist/src/services/clubService.bundle');

const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);
const expect = chai.expect;

let response;

describe('club service', () => {
  beforeEach(ngModule('local-poker-club'));

  let $httpBackend, clubService;

  beforeEach(inject(($injector) => {
    clubService = $injector.get('clubService');
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('when instantiated', () => {
    it('should contain a \'post\' method', () => {
      expect(clubService).to.not.be.undefined;
      expect(clubService.post).to.not.be.undefined;
    });

    it('should contain a \'get\' method', () => {
      expect(clubService).to.not.be.undefined;
      expect(clubService.get).to.not.be.undefined;
    });

    it('should contain a \'put\' method', () => {
      expect(clubService).to.not.be.undefined;
      expect(clubService.put).to.not.be.undefined;
    });
  });

  describe('when creating a new club, ', () => {
    beforeEach(() => {
      $httpBackend
        .when('POST', '/clubs/post')
        .respond(201, {_id:'1', clubName: 'Club Foo', owner: 'foo@bar.com'});

      const newClub = {
        clubName: 'Club Foo',
        owner: 'foo@bar.com',
      };

      clubService.post(newClub).then(data => {
        response = data;
      });

      $httpBackend.flush();
    });

    it('should respond with status 201', () => {
      expect(response.status).to.equal(201);
    });

    it('should contain the new club in the response', () => {
      expect(response.data).to.not.be.undefined;
      expect(response.data._id).to.equal('1');
      expect(response.data.clubName).to.equal('Club Foo');
      expect(response.data.owner).to.equal('foo@bar.com');
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('when fetching all clubs', () => {
    const clubs = [
      {_id:1, clubName: 'Club Foo', owner: 'foo@lpc.io'},
      {_id:2, clubName: 'Club Bar', owner: 'bar@lpc.io'},
      {_id:3, clubName: 'Club Baz', owner: 'baz@lpc.io'},
    ];

    beforeEach(() => {
      $httpBackend
        .when('GET', '/clubs/get')
        .respond(200, {clubs});

      clubService.get('*', promise => {
        promise.then(clubs => {
          response = clubs;
        });
      });

      $httpBackend.flush();
    });

    it('should respond 200', () => {
      expect(response.status).to.equal(200);
    });

    it('should return 3 clubs', () => {
      expect(response.data.clubs.length).to.equal(3);
    });

    it('should return the correct clubs', () => {
      expect(response.data.clubs).to.deep.equal(clubs);
    });
  });

  describe('when fetching all clubs but none exist', () => {
    beforeEach(() => {
      $httpBackend
        .when('GET', '/clubs/get')
        .respond(404, null);

      clubService.get('*', promise => {
        promise.catch(err => {
          response = err;
        });
      });

      $httpBackend.flush();
    });

    it('should respond 404', () => {
      expect(response.status).to.equal(404);
    });
  });

  describe('when fetching an existing club', () => {
    beforeEach(() => {
      $httpBackend
        .when('GET', '/clubs/get/Club Foo')
        .respond(200, {_id:1, clubName: 'Club Foo', owner: 'foo@bar.com'});

      clubService.get('Club Foo', promise => {
        promise.then(club => {
          response = club;
        });
      });

      $httpBackend.flush();
    });

    it('should respond 200', () => {
      expect(response.status).to.equal(200);
    });

    it('should respond with the clubs detail', () => {
      expect(response.data._id).to.equal(1);
      expect(response.data.clubName).to.equal('Club Foo');
      expect(response.data.owner).to.equal('foo@bar.com');
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('when editing a club', () => {
    beforeEach(() => {
      $httpBackend
        .when('PUT', '/clubs/put')
        .respond(200, {_id:1, clubName: 'Club Bar', owner: 'bar@foo.com'});

      const club = {
        _id: 1,
        clubName: 'Club Bar',
        owner: 'bar@foo.com',
      };

      clubService.put(club).then(club => {
        response = club;
      });

      $httpBackend.flush();
    });

    it('should respond 200', () => {
      expect(response.status).to.equal(200);
    });

    it('should respond with the updated club data', () => {
      expect(response.data._id).to.equal(1);
      expect(response.data.clubName).to.equal('Club Bar');
      expect(response.data.owner).to.equal('bar@foo.com');
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

});
