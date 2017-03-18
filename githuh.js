const GitHub = require('./github_api');

const github = new GitHub();

var call = process.argv[2];
var username = process.argv[3];

var opts = function() {
  console.log("githuh repos <username>: Return a list of the user's recent repos");
  console.log("githuh stars <username>: Return a list of the user's starred repos");
  console.log("githuh profile <username>: Return the user's profile information");
}

if (call === "repos") {
  github.repos(function(repos) {
    repos.forEach(function(out) {
      console.log(repo.name);
    });
  });
}

else if (call === "stars") {
  github.stars(function(stars) {
    stars.forEach(function(out) {
      console.log(repo.name);
    });
  });
}

else if (call === "profile") {
  github.profile(function(profile) {
    console.log("Username: " + profile.login);
    console.log("Email: " + profile.email);
    console.log("Public Repos: " + profile.public_repos);
    console.log("Following: " + profile.following);
    console.log("Followers: " + profile.followers);
  });
}
