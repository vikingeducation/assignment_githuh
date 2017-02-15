const apiKey = process.env.GITHUB_API_KEY;
const Github = require("./github_api");

const user = "blackwright";
const github = new Github(apiKey);

github.repos(user, (repos) => {
  if (repos.length > 0) {
    console.log(`${user}'s repos:`);
    repos.forEach( (repo) => {
      console.log(repo.name);
    });
  } else {
    console.log("No repos found.")
  };
  console.log();
});

github.starred(user, (starred) => {
  if (starred.length > 0) {
    console.log(`${user}'s starred repos:`);
    starred.forEach( (repo) => {
      console.log(repo.name);
    });
  } else {
    console.log("No stars found.");
  };
  console.log();
});

github.profile(user, (profile) => {
  console.log(`Username: ${profile.login}`);
  console.log(`Email: ${profile.email}`);
  console.log(`Public Repos: ${profile.public_repos}`);
  console.log(`Followers: ${profile.followers}`);
  console.log(`Following: ${profile.following}`);
  console.log();
});
