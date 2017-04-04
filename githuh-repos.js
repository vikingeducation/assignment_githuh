#!/usr/bin/env node

var program = require('commander');
const request = require('request');

const baseUri = 'https://api.github.com';

program.parse(process.argv);

var usernames = program.args;

if (usernames.length != 1) {
    console.error('Usage: githuh repos <username>');
    process.exit(1);
}

const url = `${baseUri}/users/${usernames}/repos`;
const headers = {'User-Agent': 'rabGIT'};

request({url: url, headers: headers}, function(error, response, body) {
    if (!error & response.statusCode === 200) {
      console.log('Repos for username: ' + usernames);
      JSON.parse(body).forEach(reponame => {console.log(reponame.name) });
    }});
