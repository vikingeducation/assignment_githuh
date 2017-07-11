const request = require('request');
const inquirer = require('inquirer');
const chalk = require('chalk');

var get = function(params, profile){
  switch(params) {
    case "repos":
      var uriC = 'https://api.github.com/users/'+profile+"/"+params;
      request({uri: uriC, headers: {"user-agent": "node.js", "authorization": "token {{{{OAUTH TOKEN}}}}"}}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var JSONdata = JSON.parse(body);
        JSONdata.forEach(function(repo){
          console.log(chalk.green(repo.name));
          console.log(chalk.magenta(repo.description));})
      }
      else {console.log(chalk.red("error!"))}
      })
    case "stars":
      var uriC = 'https://api.github.com/users/'+profile+"/"+"starred";
      request({uri: uriC, headers: {"user-agent": "node.js", "authorization": "token {{{{OAUTH TOKEN}}}}"}}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var JSONdata = JSON.parse(body);
        JSONdata.forEach(function(repo){
          console.log(chalk.green(repo.name));
          console.log(chalk.magenta(repo.description));})
      }
      else {console.log(chalk.red("error!"))}
      })
      break;
    case "profile":
      var uriC = 'https://api.github.com/users/'+profile;
      request({uri: uriC, headers: {"user-agent": "node.js", "authorization": "token {{{{OAUTH TOKEN}}}}"}}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var JSONdata = JSON.parse(body);
        console.log("Name: ", JSONdata.login);
        console.log("Followers: ", JSONdata.followers);
        console.log("Repos: ", JSONdata.public_repos);
        console.log("GitHub URL: ", JSONdata.html_url);
      }
      else {console.log(chalk.red("error!"))}
      })
      break;
  }
};

var start = function(){
  console.log(chalk.magenta("Welcome to Githuh!"));
  setTimeout(function() {
    console.log(chalk.green("Please tell us what you're looking for!"));
  }, 1000);
  setTimeout(function(){
    console.log(chalk.cyan("Enter your query in the following format:"))},
    1700);
  setTimeout(function(){
    console.log(chalk.bgGreen("githuh"), chalk.bgYellow(":search-params:"), chalk.bgBlue(":user-profile-to-search:"))},
    2400);
  setTimeout(function(){
    console.log(chalk.magenta("Search options: 'repos', 'profile', or 'stars'"))},
    2500);
  setTimeout(function(){
    results = inquirer.prompt([{
          name: "search",
          type: "input",
          message: ">",
        }])
        .then(function(result){
          return new Promise(function(){
            if (result.search.length<7){console.log(chalk.red("No search was requested."));}
            else {

              var params = [];
              var profile = [];
              var index = [1, 1, 1, 1, 1, 1, 1, 1];
              for (i=7; i<index.length; i++) {
                if (result.search[i] !== " ") {
                  params.push(result.search[i]);
                  index.push(i);
                }
              }
              for (i=(index.length);i<result.search.length;i++) {
                profile.push(result.search[i]);
              }
              params = params.join('');
              profile = profile.join('');
              get(params, profile);
            }
          })
      })
  }, 2600);
};

start();
