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
        githuh.displayProp(element.name + ': ', element.description);
      });
    })
  },

  stars: function(username) {
    // return a list of the user's starred repos

    const url = `${base}${username}/starred`;
    githuh.makeRequest(url, function(results) {
      results.forEach(function(element) {
        githuh.displayProp(element.full_name + ': ', element.description);
      })
    })

  },

  profile: function(username) {
    // return the user's profile information:

    const url = `${base}${username}`
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
          githuh.displayProp(prop, results[props[prop]]);
        }
      }
    })
  },

  displayProp: function(prop, value) {
    console.log(chalk.blue.bold(prop) + chalk.yellow(value));
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
