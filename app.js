const { githubAPI } = require('./github_api');

if(process.argv.length != 4){
	console.log('Invalid arguments');
	process.exit(1);
}

const command = process.argv[2];
const username = process.argv[3];

// logs the commands for debug
// console.log(process.argv);

switch(command){
	case 'repos':
		githubAPI.getRecentRepos(username, (repos) => {
			if (repos) {
				console.log('RECENT REPOS ------');
				repos.map(repo => {
					console.log(repo.name)
				});

			} else {
				console.log('An error has occurred.')
			}
		});
		return;

	case 'stars':
		githubAPI.getStarredRepos(username, (repos) => {
			if (repos) {
				console.log('STARRED PROJECTS ------');
				repos.map(repo => {
					console.log(repo.name);
				})
			} else {
				console.log('An error has occurred.')
			}
		});
		return;

	case 'profile':
		githubAPI.getProfileInfo(username, (user) => {
			userInfo = {
				username: user.login,
				name: user.name,
				email: !user.email ? 'None' : user.email,
				bio: !user.bio ? 'None' : user.bio,
				company: !user.company ? 'None' : user.company,
				blog: !user.blog ? 'None' : user.blog,
				location: user.location,
				url: user.url,
				publicRepos: user.public_repos,
				followers: user.followers,
				following: user.following
			}
			console.log('USER INFO ----------') 
			console.log(userInfo);
		});
		return;

	default:
		console.log('Argument Not Supported');
		return;
}

