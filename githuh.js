#!/usr/bin/env node

var request = require("request");
var program = require("commander");

var option = "starred";
var user = "ke2uke";
var options = {
  url:`https://api.github.com/users/${user}/${option}`,
  headers:
  {
    'User-Agent': 'request'
  }
};

program
  .version('1.0.0')
  .command('<user> <option>', 'username and option (eg myname repos)')
  .action(function(usr, opt){
    console.log("user = ", usr);
    console.log("option = ", opt);
    user = usr;
    switch(opt) {
      case "repos":
        option = opt;
        break;
      case "stars":
        option = "starred";
        break;
      case "profile":
        options["url"] = `https://api.github.com/users/${user}`;
        option = "";
        break;
    }
  });
program
  .parse(process.argv);


function check(error, response) {
  if(!error && response.statusCode == 200) {
    console.log("All Good");
    return true;
  } else {
    console.log(error);
    return false;
  }
}
function repos(error, response, body) {
  if(check(error, response)) {
    var data = JSON.parse(body);
    data.forEach(function(item){
      console.log(item["name"])
    });
  }
}
function profile(error, response, body) {
  if(check(error, response)) {
    var data = JSON.parse(body);
    console.log(data["name"]);
    console.log(data["url"]);
  }
}
request(options, function(err, res, body){
  switch(option) {
    case "repos":
      repos(err, res, body);
      break;
    case "starred":
      repos(err, res, body);
      break;
    case "":
      profile(err, res, body);
      break;
    default:
      console.log("issues");
      break;
  }
});
