#!/usr/bin/env node
const request = require('request');
const program = require('commander');
const baseUri = "https://api.github.com/users";

class GitHuh {
  constructor(username) {
    this.username = username;
  };
  repos(callback) {
    this._sendRequest("repos", callback);
  }
  stars(callback) {
    this._sendRequest("starred", callback);
  }
  profile(callback) {
    this._sendRequest("profile", callback);
  }
  following(callback) {
    this._sendRequest("following", callback);
  }
  _sendRequest(type, callback) {
    let url = "";

    if (type === "repos" || type === "starred" || type === "following") {
      url = `${baseUri}/${this.username}/${type}`;
    } else {
      url = `${baseUri}/${this.username}`;
    };

    var baseRequest = request.defaults({
        headers: {'User-Agent': 'githuh'}
    });

    baseRequest(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        callback(JSON.parse(body));
      } else {
        console.error(JSON.parse(body));
      };
    });
  }
};

program
  .version('0.1.0')
  .usage(`repos <username> -- Returns a list of the user's repos.
         githuh stars <username -- Returns a list of the user's starred repos.
         githuh profile <username> -- Returns the user's profile information.
         githuh following <username> -- Returns a list of who the user is following.`)
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  let command = program.args[0];
  let username = program.args[1];
  const githuh = new GitHuh(username);

  if (command === "repos") {
    console.log(username + "'s Repositories:");
    console.log("=====");
    githuh.repos(function(repos) {
      repos.forEach(repo => { console.log(repo.name) });
    });
  } else if (command === "stars") {
    console.log(username + "'s Starred Repositories:");
    console.log("=====");
    githuh.stars(function(repos) {
      repos.forEach(repo => { console.log(repo.name) });
    });
  } else if (command === "following") {
    console.log("This is who " + username + " is following:");
    console.log("=====");
    githuh.following(function(follows) {
      follows.forEach(follow => { console.log(follow.login) });
    });
  } else if (command === "profile") {
    console.log(username + "'s Profile Information:");
    console.log("=====");
    githuh.profile(function(profile) {
      for (var prop in profile) {
        console.log(prop + ": " + profile[prop]);
      };
    });
  } else {
    program.outputHelp();
  }
};
