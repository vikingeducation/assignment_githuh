#!/usr/bin/env node

const request = require('request');
require('./githuh-request');


makeRequest('stars', function(repos) {
    repos.forEach(reponame => {
        if (reponame.stargazers_count > 0) {
            console.log(reponame.name);
        }
    });
});
