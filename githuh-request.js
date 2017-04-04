#!/usr/bin/env node

var program = require('commander');
const request = require('request');

const baseUri = 'https://api.github.com';

program.parse(process.argv);

var usernames = program.args;

if (usernames.length != 1) {
    console.error('Usage: githuh <command> <username>');
    process.exit(1);
}

var url, title = '';

makeRequest = function(type, callback) {
    switch (type) {
      case 'repos':
        title = "Repos for: " + usernames;
        url = `${baseUri}/users/${usernames}/repos`;
        break;
      case 'stars':
        title = "Starred Repos for: " + usernames;
        url = `${baseUri}/users/${usernames}/repos`;
        break;
      case 'profile':
        title = "Profile for: " + usernames;
        url = `${baseUri}/users/${usernames}`;
        break;
      default:
        console.error('Command must be one of repos, stars or profile.  Type githuh -h for help.');
        process.exit(1);
    }

    const headers = {
        'User-Agent': 'rabGIT'
    };

    request({
        url: url,
        headers: headers
    }, function(error, response, body) {
        if (!error & response.statusCode === 200) {
            console.log(title);
            callback(JSON.parse(body));
        }
    });
};
