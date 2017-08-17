require('dotenv').config( {path: "variables.env"});
const apiKey = process.env.YOUR_API_KEY
const user = process.env.YOUR_USERNAME
const GitHuh = require('./githuhApi');

const githuh = new GitHuh(apiKey);

githuh.repos(user, (repos) => {
	if(repos.length > 0 ) {
		console.log(`${user}'s repos:`);
		repos.forEach((repo) => {
			console.log(repo.name);
		});
	} else {
		console.log("No repos Found.")
	};
	console.log();
});

 githuh.starred(user, (starred) => {
	console.log(process.env.YOUR_API_KEY);
 	if(starred,length > 0) {
 		console.log(`${user}'s starred:`);
 		starred.forEach( (star) => {
 			// statements
 			console.log(star.name)
 		});
 	} else {
 		console.log("No starred repo found.");
 	};
 	console.log()
 })
	console.log(githuh.repos);

githuh.profile(user, (profile) => {
  console.log(`Username: ${profile.login}`);
  console.log(`Email: ${profile.email}`);
  console.log(`Public Repos: ${profile.public_repos}`);
  console.log(`Followers: ${profile.followers}`);
  console.log(`Following: ${profile.following}`);
  console.log();
});