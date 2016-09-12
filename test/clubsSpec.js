describe('club controller', function() {
  beforeEach(module('local-poker-club'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('create new club', function() {
    it('contains a function called "create"', function() {
			var controller = $controller('clubController');
      expect(controller.create).not.toBeUndefined();
    })

    it('returns 201 status code', function() {
      var controller = $controller('clubController');
      var statusCode = controller.create();

      expect(statusCode).toEqual(201)
    })
  })
})
