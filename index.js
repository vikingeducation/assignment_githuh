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

 githuh
 .command('stars <user>')
 .description('Return a list of the user\'s starred repos.')
 .action(function(user) {
   githubApi.stars(user, function(repos){
      if ( repos.length > 0){
        console.log(user + "'s starred repos:")
        repos.forEach(function(repo){
          console.log("\nName: " + repo.name + "\nStar count: "+ repo.stargazers_count)
        })
      } else {
        console.log("No starred repos found for " + user)
      }
   })
 });

 githuh
 .command('profile <user>')
 .description('Return a list of the user\'s profile information.')
 .action(function(user) {
   githubApi.profile(user, function(profile){
      if ( profile.id ) {
        console.log("Email: "+ profile.email);
        console.log("Number of public repos: " + profile.public_repos);
        console.log("Followers: " + profile.followers);
        console.log("Following: " + profile.following);
      } else {
        console.log("No profile found for " + user)
      }
   })
 });

githuh.parse(process.argv);