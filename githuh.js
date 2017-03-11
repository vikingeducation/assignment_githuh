require('dotenv').config();
const Githuh = require("./githuh_api");
const token= process.env.GITHUB_TOKEN;

const githuh = new Githuh(token);



/* Search for user (myself) */
var username = function(callback) {
  githuh.searchforUser(function(account) {
  var user = account.items[0].login;
  callback(user);
});
};

var repos = function(user) {
  githuh.repos(user, function(repo) {
  repo.forEach(function(item) {
    console.log(item.name);
    console.log(item.description);
  });
});
};

username(repos);

var stars = function(user) {
  githuh.stars(user, function(stars) {
    if (stars.length > 0) {
      starred.forEach(function(star) {
        console.log(star.name);
      });
    } else {
      console.log("You have no stars :( ");
    };
    console.log();
  });
};

username(stars);

var profile = function(user) {
githuh.profile(user, function(profile) {
  console.log(`${user} Profile Info:`)
  console.log(`Name: ${profile.name}`);
  console.log(`Location: ${profile.location}`)
  console.log(`Hireable: ${profile.hireable}`);
  console.log(`Created: ${profile.created_at}`);
  console.log(`Total number of Repos: ${profile.total_private_repos}`);
  console.log();
});
};
username(profile);
