
"use strict";

const request = require('request');

const baseUri = 'https://api.github.com/users';

function parseDate(str_date) {
  return new Date(Date.parse(str_date));
}

function sortObject(obj) {
  return Object.keys(obj).sort().reverse().reduce(function (result, key) {
    result[key] = obj[key];
    return result;
  }, {});
}

class GitHub {

  constructor(apiKey) {
    this.apiKey = apiKey
  }

  recentStars(username, callback) {
    this._sendRequests(username, '/starred', callback)
  }

  recentRepos(username, callback) {
    this._sendRequests(username, '/repos', callback)
  }

  profileDetails(username, callback) {
    this._sendRequests(username, '', callback)
  }

  followings(username, callback) {
    this._sendRequests(username, '/followers', callback)
  }

  _sendRequests(username, type, callback) {

    var options = { method: 'GET',
      url: `${baseUri}/${username}${type}`,
      headers:
       { 'apiKey': this.apiKey,
         'cache-control': 'no-cache',
         'User-Agent': 'Chrome' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      if (response.statusCode == 200) {
        callback(JSON.parse(body))
      }

    });
  }



  printRecentStars(username) {
    this.recentStars(username, function(data) {
      var stars = data;
      console.log('---------------------------------------');
      console.log('Here are the repos starred by the user ');
      stars.forEach(star => {
        console.log('Owner: ' + star["owner"]["login"]);
        console.log('Name: ' + star["name"]);
        console.log('Description: ' + star["description"]);
        console.log(' ');
      })
    });
  }

  printProfileDetails(username) {
    this.profileDetails(username, function(data) {
      console.log('---------------------------------------');
      console.log('Details about the user');
      console.log('Email: ' + data["email"]);
      console.log('Location: ' + data["location"]);
      console.log('Number of repos: ' + data["public_repos"]);
      console.log('Number of followers: ' + data["followers"]);
      console.log('Number of followings: ' + data["following"]);
      console.log(' ');
    });
  }

  printFollowings(username) {
    this.followings(username, function(data) {
      var followers = data;
      console.log('---------------------------------------');
      console.log('Here are the details of the followers ');
      followers.forEach(follower => {
        console.log('Login: ' + follower["login"]);
        // printProfileDetails(follower["login"]);
        console.log(' ');
      })
    });
  }

  printRecentRepos(username) {
    this.recentRepos('visiona', function(data) {
      var repos = data;
      var sortingRepos = {};
      repos.forEach(repo => {
        sortingRepos[ repo["updated_at"] ] = [repo["name"], repo["description"] ];
      })

      sortingRepos = sortObject(sortingRepos);

      console.log('---------------------------------------');
      console.log('Here are the recent 10 repos by the user ');
      var i = 0;
      for (var date in sortingRepos) {
        console.log('Name: ' + sortingRepos[date][0]);
        console.log('Description: ' + sortingRepos[date][1]);
        console.log(parseDate(date));
        console.log(' ');
        i += 1;
        if (i > 9) { break; }
      }
    })
  }



}

var apiKey = process.env.MY_VARIABLE

const git = new GitHub(apiKey);

git.printRecentStars('visiona');
git.printFollowings('visiona');
git.printProfileDetails('visiona');
git.printRecentRepos('visiona');
