#!/usr/bin/env node
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');
var program = require('commander');

var baseUri = "https://api.github.com";

var GitHubUser = function () {
  function GitHubUser(username) {
    _classCallCheck(this, GitHubUser);

    this.username = username;
  }

  _createClass(GitHubUser, [{
    key: 'repos',
    value: function repos(callback) {
      this._sendRequest("/repos", callback);
    }
  }, {
    key: 'starredRepos',
    value: function starredRepos(callback) {
      this._sendRequest("/starred", callback);
    }
  }, {
    key: 'profile',
    value: function profile(callback) {
      this._sendRequest("", callback);
    }
  }, {
    key: '_sendRequest',
    value: function _sendRequest(type, callback) {
      var options = {
        url: baseUri + '/users/' + this.username + type,
        headers: { 'User-Agent': 'request' }
      };

      console.log('Request:', options.url);

      request(options, function (error, response, body) {
        if (error || response.statusCode !== 200) {
          console.error('Request for info failed (', response.statusCode, '):', error);
          console.error(body);
        }

        if (!error && response.statusCode === 200) {
          callback(JSON.parse(body));
        }
      });
    }
  }]);

  return GitHubUser;
}();

var infoRequestedValue = void 0;
var usernameValue = void 0;

program.arguments('<infoRequested> <username>').action(function (infoRequested, username) {
  infoRequestedValue = infoRequested;
  usernameValue = username;
}).parse(process.argv);

if (typeof infoRequestedValue === 'undefined' || typeof usernameValue === 'undefined') {
  console.error('Error: infoRequested and username are required');
  process.exit(1);
}

function outputInfo(data) {
  console.log(data);
}

var gitHubUser = new GitHubUser(usernameValue);
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
//# sourceMappingURL=index.js.map