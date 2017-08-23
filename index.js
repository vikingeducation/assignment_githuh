#!/usr/bin/env node

//had some help from here, thanks learned a lot:
//https://developer.atlassian.com/blog/2015/11/scripting-with-node/
//comoman line interface tool
//https://github.com/tj/commander.js/
var program = require('commander');

//request lib
const request = require('request');

//my custom api wrapper module
const gitHuhModule = require('./api_wrapper');

//set up new gitHuh
const gitHuh = new gitHuhModule("coelacanth7")

//cli params
program
  .arguments('[cmd] [username]')
  .action(function(cmd, username) {

    console.log('I am getting the %s info from %s', cmd, username )

    //wrong params action
    if (typeof cmd === 'undefined' || typeof username === 'undefined') {
      console.log('Invalid command given');
      console.log('To run githuh fire:');
      console.log('githuh ( profile || repos || starred ) ( username )');
      console.log('but without the parenthesis');
      process.exit(1);
    } else {

        switch (cmd){

          case "profile":

            gitHuh.getUserProfileInfo(username, function(data) {
              console.log('USER INFO:');
              console.log("=============");
              console.log(`USERNAME: ${data.login}`);
              console.log(`NAME: ${data.name}`);
              console.log(`EMAIL: ${data.email}`);
              console.log(`FOLLOWERS: ${data.followers}`);
              console.log(`FOLLOWING: ${data.following}`);
              console.log(`NUMBER OF REPOS: ${data.public_repos}`);
            });

            break;

          case "repos":

            gitHuh.getRepos(username, function(data) {
              console.log('LIST OF REPOS FOR ' + username);
              console.log("=============");
              data.forEach(function(repo){ console.log(repo.name) });
            });

            break;

          case "starred":

            gitHuh.getStarred(username, function(data) {
              console.log(`LIST OF STARRED REPOS FOR ${username}`);
              console.log('=============');
              data.forEach(function(starred){ console.log(starred.name) });
            });
        }//end switch
      }//end if else

  })//end .action
  .parse(process.argv);
