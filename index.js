var request = require("request");
var _ = require("underscore");
var keys = require("C:/Users/Jared/Modules/Cles/items");

var api = "https://api.github.com/users/";
var user = process.argv[3] + "/";
// Section - will be 'repos', 'starred', or nothing if we're getting profile info
var section = process.argv[2];
// Change command line parameters to appropriate link sections if necessary
if (section === "stars") {
  section = "starred";
} else if (section === "profile") {
  section = "";
  user = process.argv[3];
}

// Options object, which gets passed to request call
var options = {
  method: "GET",
  section: section,
  url: api + user + section,
  headers: {
    accept: "application/vnd.github.v3.star+json",
    "User-Agent": keys.github
  }
};

// Callback function to be used by .sort to sort results by date (descending)
var byDate = function(a, b) {
  if (a.date > b.date) {
    return -1;
  } else {
    return 1;
  }
};

// Function to retrieve recent repositories
var getUserRepos = function(obj) {
  var userRepos = [];
  obj.forEach(function(obj) {
    initDate = new Date(obj.created_at);
    var repo = { name: obj.name, date: initDate };
    userRepos.push(repo);
  });
  userRepos.sort(byDate);
  userRepos = userRepos.slice(0, 5);
  console.log(_.pluck(userRepos, "name"));
};

// Function to retrieve starred repositories
var getStarRepos = function(obj) {
  var starRepos = [];
  obj.forEach(function(obj) {
    starDate = new Date(obj.starred_at);
    var repo = { name: obj.repo.name, date: starDate };
    starRepos.push(repo);
  });

  starRepos.sort(byDate);
  starRepos = starRepos.slice(0, 5);
  console.log(_.pluck(starRepos, "name"));
};

// Function to retireve user profile info
var getProfile = function(obj) {
  console.log(`Name: ${obj.name}
    Login: ${obj.login}
    Number of repositories: ${obj.public_repos}
    Location: ${obj.location}
    Bio: ${obj.bio}`);
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);
  // Parse response into object
  var obj = JSON.parse(body);

  switch (options.section) {
    case "repos":
      getUserRepos(obj);
      break;
    case "starred":
      getStarRepos(obj);
      break;
    case "":
      getProfile(obj);
      break;
    default:
      console.log("One of your parameters was incorrect. Please try again.");
  }
});
