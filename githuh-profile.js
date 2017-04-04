#!/usr/bin/env node

const program = require('commander');
const request = require('request');

const baseUri = 'https://api.github.com';

program
  .parse(process.argv);

var usernames = program.args;

if (usernames.length != 1) {
    console.error('Usage: githuh profile <username>');
    process.exit(1);
}

const url = `${baseUri}/users/${usernames}`;
const headers = {'User-Agent': 'rabGIT'};



request({url: url, headers: headers}, function(error, response, body) {
    if (!error & response.statusCode === 200) {
          console.log('Profile for username: ' + usernames);
          APIresponse = JSON.parse(body);
          console.log('Name: ' + APIresponse.name);
          console.log('URL: ' + APIresponse.html_url);
          console.log('Repos: ' + APIresponse.public_repos);
          console.log('Followers: ' + APIresponse.followers);
          console.log('Following: ' + APIresponse.following);
    }});
