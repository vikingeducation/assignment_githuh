#!/usr/bin/env node

const request = require('request');
require('./githuh-request');


makeRequest('profile', function(profile) {
  console.log('Name: ' + profile.name);
  console.log('URL: ' + profile.html_url);
  console.log('Repos: ' + profile.public_repos);
  console.log('Followers: ' + profile.followers);
  console.log('Following: ' + profile.following);
});
