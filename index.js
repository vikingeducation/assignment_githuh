var request = require("request");
var _ = require("underscore");
var keys = require("C:/Users/Jared/Modules/Cles/items");

var api = "https://api.github.com/users/";
var user = "jaredjgebel/";
var section = "repos";

// Options object, which gets passed to request call
var options = {
  method: "GET",
  url: api + user + section,
  headers: {
    accept: "application/vnd.github.v3+json",
    "User-Agent": keys.github
  }
};

// Callback function to be used by .sort to sort results by date
var byDate = function(a, b) {
  if (a.date > b.date) {
    return -1;
  } else {
    return 1;
  }
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);
  // Parse response into object
  var obj = JSON.parse(body);

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
  /*
  var getStarRepos = function(obj) {
    var starRepos = [];
    obj.forEach(function(obj) {

    })
  };
  */
  // Function to retireve user profile info

  getUserRepos(obj);
});
// how parameters get passed in command line
// process.argv;
