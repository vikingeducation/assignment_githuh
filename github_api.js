
"use strict";

const request = require('request');

const baseUri = 'https://api.github.com/users/';

class GitHub {

  constructor(apiKey) {
    this.apiKey = apiKey
  }

  recentStars(username, callback) {
    this._sendRequests(username)
  }

  recentRepos(username, callback) {

  }

  recentProfile(username, callback) {

  }

  recentForkedFrom(username, callback) {

  }

  _sendRequests(username, callback) {

    const url = `${baseUri}/${username}`

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body))
      }
    })
  }

}



const gitHuh = new GitHub(API_KEY);
gitHuh.recentStars('visiona', function(data) {
  "use strict";
  console.log(data);
})
