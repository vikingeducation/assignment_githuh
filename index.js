#!/usr/bin/env node

const request = require('request');
const program = require('commander');

const baseUri = "https://api.github.com";

class GitHubUser {
  constructor(username) {
    this.username = username;
  }

  repos(callback) {
    this._sendRequest("/repos", callback);
  }

  starredRepos(callback) {
    this._sendRequest("/starred", callback);
  }

  profile(callback) {
    this._sendRequest("", callback);
  }

  _sendRequest(type, callback) {
    const options = {
      url: `${baseUri}/users/${this.username}${type}`,
      headers: {'User-Agent': 'request'}
    };

    console.log('Request:', options.url);

    request(options, function(error, response, body) {
      if(error || response.statusCode !== 200) {
        console.error('Request for info failed (', response.statusCode, '):', error);
        console.error(body);
      }

      if (!error && response.statusCode === 200) {
        callback(JSON.parse(body));
      }
    });
  }
}

let infoRequestedValue;
let usernameValue;

program
  .arguments('<infoRequested> <username>')
  .action(function(infoRequested, username) {
    infoRequestedValue = infoRequested;
    usernameValue = username;
  })
  .parse(process.argv);

if ((typeof infoRequestedValue === 'undefined') || (typeof usernameValue === 'undefined')) {
  console.error('Error: infoRequested and username are required');
  process.exit(1);
}

function outputInfo(data) {
  console.log(data);
}

let gitHubUser = new GitHubUser(usernameValue);
switch (infoRequestedValue) {
  case 'repos':
    gitHubUser.repos(outputInfo);
    break;
  case 'stars':
    gitHubUser.starredRepos(outputInfo);
    break;
  case 'profile':
    gitHubUser.profile(outputInfo);
    break;
}
