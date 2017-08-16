#!/usr/bin/env node

// require cli package
var program = require('commander');

// require api request package
var request = require('request');

// require GitHub class
var GitHub = require('./lib/github_api');

// pull in GitHub User Agent for header
var {USER_AGENT} = require('./secrets');

// set up a new instance of the API class
const githuh = new GitHub(USER_AGENT);

// populate program with details
program
  .version('0.1.0')
  .arguments('<cmd> [username]')
  .action(function (cmd, username) {
     cmdValue = cmd;
     cmdUsername = username;
  });

// parse the incoming cli input
program.parse(process.argv);

// handle insufficient cli input
if (typeof cmdValue === 'undefined' && typeof cmdUsername === 'undefined') {
   console.error("Please supply a command followed by a username");
   console.log("Ex: githuh repos my_user_name");
   console.log("Commands: repos | stars | profile");
   process.exit(1);
} else if (typeof cmdValue === 'undefined') {
   console.error("Please supply a command followed by a username");
   console.log("Commands: repos | stars | profile");
   process.exit(1);
} else if (typeof cmdUsername === 'undefined') {
   console.error('Almost! Try again, but this time supply a username after '+ cmdValue);
   process.exit(1);
} else {
  // direct input to appropriate functions
  switch (cmdValue) {
    case "repos":
      githuh.repos(cmdUsername);
      break;
    case "stars":
      githuh.stars(cmdUsername);
      break;
    case "profile":
      githuh.profile(cmdUsername);
      break;
    default:
      console.log("I'm sorry, I didn't understand that command. Please try one of these options:");
      console.log("Commands: repos | stars | profile");
  };
}