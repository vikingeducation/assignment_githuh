'use strict';

const request = require('request');

const githuh = {

  repos: function(username) {
    // return a list of the user's recent repos
  },

  stars: function(username) {
    // return a list of the user's starred repos
  },

  profile: function(username) {
    // return the user's profile information:
    // email, number of public repos, follower/following counts, etc.
  }

}

module.exports = githuh;
