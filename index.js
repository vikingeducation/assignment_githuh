#!/usr/bin/env node
var githuh = require('commander');
var GithubAPI = require('./lib/GithubAPI');
var githubApi = new GithubAPI;


githuh
 .command('repos <user>')
 .description('Return a list of the user\'s recent repos.')
 .action(function(user) {
   githubApi.repos(user, function(repos){
      if ( repos.length > 0){
        console.log(user + "'s repos:")
        repos.forEach(function(repo){
          console.log(repo.name)
        })
      } else {
        console.log("No repos found for " + user)
      }

   })
 });

githuh.parse(process.argv);