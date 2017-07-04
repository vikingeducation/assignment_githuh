'use strict';

const request = require('request');
const chalk = require('chalk');
const base = 'https://api.github.com/users/'

const githuh = {

  repos: function(username) {
    // return a list of the user's recent repos

    const url = `${base}${username}/repos`;
    githuh.makeRequest(url, function(results) {
      results.forEach(function(element) {
        console.log(chalk.blue.bold(element.name) + ': ' + chalk.yellow(element.description));
      });
    })
  },

  stars: function(username) {
    // return a list of the user's starred repos

    const url = `${base}${username}/starred`;
    githuh.makeRequest(url, function(results) {
      results.forEach(function(element) {
        console.log(chalk.blue.bold(element.full_name) + ': ' + chalk.yellow(element.description));
      })
    })

  },

  profile: function(username) {
    // return the user's profile information:
    // email, number of public repos, follower/following counts, etc.

    let url = `${base}${username}`
    const props = {
      'Name: ': 'name',
      'Email: ': 'email',
      'Blog: ': 'blog',
      'Location: ': 'location',
      'Hireable: ': 'hireable',
      'Public Repos: ': 'public_repos',
      'Public Gists: ': 'public_gists',
      'Followers: ': 'followers',
      'Following: ': 'following',
      'Bio: ': 'bio'
    }
    githuh.makeRequest(url, function(results) {
      for (let prop in props) {
        if (results[props[prop]]) {
          console.log(chalk.blue.bold(prop) + chalk.yellow(results[props[prop]]));
        }
      }
    })
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
