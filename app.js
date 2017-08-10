var request = require('request');
//Get parameters after node app.js
var args = process.argv.slice(2);

//Options for repos and stars
var options = {
  url: 'https://api.github.com/users/' + args[2] +'/repos',
  qs: {
    type: 'all',
    sort: 'full_name',
    direction: 'asc'
  },
  headers: {
    'User-Agent': args[2]
  }
}

//Options for profile
var options2 = {
  url: 'https://api.github.com/users/' + args[2],
  qs: {

  },
  headers: {
    'User-Agent': args[2]
  }
}

//Call back for $node app.js githuh repos {{name}}
function callbackNames(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    for (x in info){
      console.log(info[x].name);
    }
  }
  else {
    console.log(response.statusCode);
    console.log(response.body);
  }
}

//Call back for $node app.js githuh stars {{name}}
function callbackStars(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    var sCount = 0;
    for (x in info){
      sCount += Number(info[x].stargazers_count)
    }
    console.log("Stars count = " + sCount);
  }
  else {
    console.log(response.statusCode);
    console.log(response.body);
  }
}

//Call back for $node app.js githuh profile {{name}}
function callbackProfile(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    var sCount = 0;
    console.log(console.log("Name " + info.name));
    console.log(console.log("Email " + info.email));
    console.log(console.log("Public Repos " + info.public_repos));
    console.log(console.log("Following " + info.following));
    console.log(console.log("Follower " + info.followers));

  }
  else {
    console.log(response.statusCode);
    console.log(response.body);
  }
}
//Check $node app.js githuh {{name}} enterName
if (args[1] === 'repos') {
  request(options, callbackNames);
}
else if (args[1] === 'stars'){
  request(options, callbackStars);
}
else if (args[1] === 'profile'){
  request(options2, callbackProfile);
}
else {
  console.log("Please enter githuh repos <username> or githuh stars <username> or githuh profile <username>");
}
