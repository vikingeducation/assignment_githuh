#!/usr/bin/env node

const request = require('request');
require('./githuh-request');


makeRequest('repos', function(repos) {
    repos.forEach(reponame => {

            console.log(reponame.name);

    });
});
