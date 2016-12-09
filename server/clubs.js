'use strict';

import mongoUtil from './mongoUtil';

mongoUtil.connect();

module.exports = {
  getAll: function getAll(done) {
    mongoUtil.clubs().find({}).limit(10).toArray((err, clubs) => {
      console.log('clubs: ', clubs);
      done(clubs);
    });
  }
};
