#!/usr/bin/env node
"use strict";

const _           = require('lodash');
const request     = require("request");
const chalk       = require('chalk');
const GitHubApi   = require("github");

let github = new GitHubApi();

let args = process.argv;
if(args[2] === "repos"){
  getRecentRepos(github, args[3]);
} else if(args[2] === "stars") {
  getStarredRepos(github, args[3]);
} else if(args[2] === "profile") {
  printUserGitInfo(github, args[3]);
}

// Print a list of user's recent repos
function getRecentRepos(github, username){
  github.repos.getForUser({
    username: username
  }, function(err, res) {
      _.each(res.data, function(value, key) {
        let dateUpdate = value.updated_at;
        let year = parseInt(dateUpdate.slice(0, 4));

        if(year > 2016){
          console.log(chalk.red(value.name));
        }
      });
  });
}

// Print List of users starred repos
function getStarredRepos(github, username){
  github.activity.getStarredReposForUser({
    username: username
  }, function(err, res) {
      _.each(res.data, function(value, key){
        console.log(chalk.yellow(value.full_name));
      })
  });
}

// Print profile git info
function printUserGitInfo(github, username){
  github.users.getForUser({
    username: username
  }, function(err, res) {
      let user_name = res.data.name;
      let email = res.data.email;
      let repo_num = res.data.public_repos;
      let following_count = res.data.following;
      let followersCount = res.data.followers;
      let location = res.data.location;
      let company = res.data.company;

      console.log(chalk.blue("name: " + user_name));
      console.log(chalk.blue("email: " + email));
      console.log(chalk.blue("public repos: " + repo_num));
      console.log(chalk.blue("following: " + following_count));
      console.log(chalk.blue("followers: " + followersCount));
      console.log(chalk.blue("location: " + location));
      console.log(chalk.blue("company: " + company));
  });
}
