'use strict';

const request = require('request');
const chalk = require('chalk');
const base = 'https://api.github.com'

const githuh = {

  repos: function(username) {
    // return a list of the user's recent repos

    const url = `${base}/users/${username}/repos`;
    githuh.makeRequest(url, function(results) {
      results.forEach(function(element) {
        console.log(chalk.blue(element.name) + `: ${element.description}`);
        console.log(chalk.green(element.html_url));
      });
    })
  },

  stars: function(username) {
    // return a list of the user's starred repos

  },

  profile: function(username) {
    // return the user's profile information:
    // email, number of public repos, follower/following counts, etc.
  },

  makeRequest: function(url, callback) {
    let options = {
      url: url,
      headers: {
        'User-Agent': 'request'
       }
    };

    request(options, function(error, response, body) {
      if (error || response.statusCode !== 200) {
        console.warn('No results returned for this username.');
      } else {
        callback(JSON.parse(body));
      }
    })
  }

}

module.exports = githuh;
