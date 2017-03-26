#!/usr/bin/env node

var program = require("commander");
var request = require("request");
var baseUri = "https://api.github.com/users/";

class GitHub {

	repos(username) {
		this.getRepos(username, function(data){
			for (var i = 0; i < 11; i++) {
				if (data[i].name) {
					console.log(data[i].name);
				}
			}
		});
	}

	getRepos(username, callback) {
		var options = {
			url: baseUri + username + "/repos",
			headers: {
				'User-Agent': 'nicoasp'
			}
		};
		request(options, function(error, response, body) {
			console.log(response.statusCode);
			if (!error) {
				callback(JSON.parse(body));
			} else {
				console.log("Error");
			} 
		});
	}

	starred(username) {
		this.getStarred(username, function(data){
			for (var i = 0; i < 11; i++) {
				if (data[i].name) {
					console.log(data[i].name);
				}
			}
		});
	}

	getStarred(username, callback) {
		var options = {
			url: baseUri + username + "/starred",
			headers: {
				'User-Agent': 'nicoasp'
			}
		};
		request(options, function(error, response, body) {
			console.log(response.statusCode);
			if (!error) {
				callback(JSON.parse(body));
			} else {
				console.log("Error");
			} 
		});
	}

	profile(username) {
		this.getProfile(username, function(data){
			if (data) {
				console.log("Email: " + data.email);
				console.log("Number of public repos: " + data.public_repos);
				console.log("Followers: " + data.followers);
				console.log("Following: " + data.following);
			}
		});
	}

	getProfile(username, callback) {
		var options = {
			url: baseUri + username,
			headers: {
				'User-Agent': 'nicoasp'
			}
		};
		request(options, function(error, response, body) {
			console.log(response.statusCode);
			if (!error) {
				callback(JSON.parse(body));
			} else {
				console.log("Error");
			} 
		});
	}
}


program
	.version('0.0.1')
	.command('repos <username>')
	.description('repos command')
	.action(function(username){
		var github = new GitHub;
		github.repos(username);
	});

program
	.version('0.0.1')
	.command('stars <username>')
	.description('stars command')
	.action(function(username){
		var github = new GitHub;
		github.starred(username);
	});

program
	.version('0.0.1')
	.command('profile <username>')
	.description('profile command')
	.action(function(username){
		var github = new GitHub;
		github.profile(username);
	});

program.parse(process.argv);







