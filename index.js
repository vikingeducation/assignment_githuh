#! /usr/bin/env node

const request = require("request");

const baseUri = "https://api.github.com/users/";

const clientID = process.env.GITHUB_CLIENT_ID;
const secretID = process.env.GITHUB_SECRET_ID;
const password = process.env.GITHUB_PASS;

class Githuh {
	constructor(type, username) {
		if (type === "repos") {
			this.repos(username);
		} else if (type === "stars") {
			this.stars(username);
		} else if (type === "profile") {
			this.profile(username);
		} else {
			console.log("Please supply a search type from the command line");
		};
	}

	repos(username) {
		this.url = baseUri + username + "/repos"

		this._sendRepoRequest(this.url);
	};

	stars(username) {
		this.url = baseUri + username + "/starred"
		this._sendRepoRequest(this.url);
	};

	profile(username) {
		this.url = baseUri + username;
		this._sendProfileRequest(this.url);
	};

	_sendRepoRequest(url) {
		var options = {
			"url": url,
			"headers": {
				"User-Agent": "Avonyel",
				"username": "Avonyel",
				"password": password
			}
		};

		var callback = function (error, response, body) {
			if (!error) {
				var repos = JSON.parse(body);
				repos = repos.filter(function (repo) {
					return repo.updated_at >= "2017-04-01";
				});

				var reposSimple = repos.map(function (repo) {
					var simplify = {
						name: repo.name,
						owner: repo.owner.login,
						url: repo.html_url,
						size: repo.size,
						language: repo.language,
						created_at: repo.created_at,
						updated_at: repo.updated_at
					};

					return simplify;
				});

				console.log(reposSimple);
			} else {
				console.log(error);
			}
		};

		request(options, callback);
	};

	_sendProfileRequest(url) {
		var options = {
			"url": url,
			"headers": {
				"User-Agent": "Avonyel",
				"username": "Avonyel",
				"password": password
			}
		};

		var callback = function (error, response, body) {
			if (!error) {
				var profile = JSON.parse(body);

				var profileSimple = {
					name: profile.name,
					email: profile.email,
					bio: profile.bio,
					company: profile.company,
					location: profile.location
				};

				console.log(profileSimple);
			} else {
				console.log(error);
			}
		};

		request(options, callback);
	}
};

var tester = new Githuh(process.argv[2], process.argv[3]);