//Required nodules

const request = require('request');
const readline = require('readline');

//Options and setup for readline
var options = {
  url: 'https://api.github.com/users/',
  headers: {
    'User-Agent': 'request'
  }
};

function alldata(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
  }
}
request(options, alldata);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// User interface

console.log("Enter one of the following commands:");
console.log("-------------------------")
console.log("githuh repos <username> - returns a list of user's recent repos");
console.log("githuh stars <username> - reutrns a list of the user's starred repos");
console.log ("githuh profile <username> = returns user's profile information")
console.log("-------------------------")

var response;

rl.question('Enter command:', (answer) => {
  var response = answer;
  var answerArr = response.split(" ");
  var command = answerArr[0] + " " + answerArr[1];

  user = answerArr[2];
  type = answerArr[1];

  switch(command) {
    case 'githuh repos': options.url = options.url + user + "/repos",
      request(options, repos);
      break;
    case 'githuh stars': options.url = options.url + user + "/starred",
      request(options, stars);
      break;
    case 'githuh profile': options.url = options.url + user,
      request(options, profile);
      break;
    default:
      console.log("Did not recognize command as 'repos', 'stars', or 'profile'")
      break;
  };
  rl.close();
});

// API parsing functions:

function profile(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);

    console.log("Name: " + info.name);
    console.log("Email: " + info.email);
    console.log("Location: " + info.location);
    console.log("Company: " + info.company);
    console.log("Hireable: " + info.hireable);
    console.log("Follower: " + info.followers);
    console.log("Following: " + info.following);
    console.log("Bio: " + info.bio);
  }
}

function stars(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    for (var i = 0; i < info.length; i++) {
      console.log("Starred Project " + i);
      console.log("Name: " + info[i].name);
      console.log("Description: " + info[i].description);
      console.log("URL: " + info[i].html_url);
      console.log("-----------------------------------------------------------")
    }
  }
}

function repos(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    for (var i = 0; i < info.length; i++) {
      console.log("Repo " + i);
      console.log("Name: " + info[i].name);
      console.log("Description: " + info[i].description);
      console.log("URL: " + info[i].html_url);
      console.log("-----------------------------------------------------------")
    }
  }
}
