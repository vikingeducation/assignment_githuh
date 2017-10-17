
"use strict";

const request = require('request');

const baseUri = 'https://api.github.com/users';

class GitHub {

  constructor(apiKey) {
    this.apiKey = apiKey
  }

  recentStars(username, callback) {
    this._sendRequests(username, 'starred', callback)
  }

  recentRepos(username, callback) {
    this._sendRequests(username, 'repos', callback)
  }

  profile(username, callback) {
    this._sendRequests(username, '', callback)
  }

  followings(username, callback) {
    this._sendRequests(username, 'followers', callback)
  }

  _sendRequests(username, type, callback) {

    var options = { method: 'GET',
      url: `${baseUri}/${username}/${type}`,
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

}


var apiKey = '5f63dd5fadf0b5740575e442e5a7fe86b43db064';

const git = new GitHub(apiKey);

git.recentStars('visiona', function(data) {
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

function parseDate(str_date) {
  return new Date(Date.parse(str_date));
}

function sortObject(obj) {
    return Object.keys(obj).sort().reverse().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

git.recentRepos('visiona', function(data) {
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

});

git.profile('visiona', function(data) {
  var profile = data;
  console.log('---------------------------------------');
  console.log('Details about the user');
  console.log('Email: ' + data["email"]);
  console.log('Location: ' + data["location"]);
  console.log('Number of repos: ' + data["public_repos"]);
  console.log('Number of followers: ' + data["followers"]);
  console.log('Number of followings: ' + data["following"]);
  console.log(' ');
});

git.followings('visiona', function(data) {
  var stars = data;
  console.log('---------------------------------------');
  console.log('Here are the repos starred by the user ');
  followers.forEach(follower => {
    console.log('Login: ' + followers["login"]);
    git.profile(followers["login"], function(follower_data) {
      console.log('Number of repos: ' + follower_data["public_repos"]);
      console.log('Number of followers: ' + follower_data["followers"]);
      console.log('Number of followings: ' + follower_data["following"]);
    });
    console.log(' ');
  })
});
