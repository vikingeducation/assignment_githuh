#!/usr/bin/env node

"use strict";

const request = require('request');
const baseUri = "https://api.github.com";
const key = require('./config/setup');
const cliArgs = process.argv;

const cliEntry = {
	cliCommand: cliArgs[2],
	cliUserName: cliArgs[3]
} //cliEntry

const command = cliEntry.cliCommand;

class GitHuh {
	constructor(apiKey) {
		this.apiKey = "token " + apiKey;
	}

	repos(user, callback) {
		this._sendRequest(cliEntry.cliCommand, cliEntry.cliUserName, "?sort=pushed", callback);
	}

	stars(user, callback) {

	}

	profile(user, callback) {

	}

	_sendRequest(type, user, parameters, callback) {
    const url = `${baseUri}/users/${user}/${type}${parameters}`;
    const options = {
    	url: url,
    	headers: {
    		"User-Agent": "stevenvz",
    		"Authorization": this.apiKey
    		}
    	};

    request.get(options, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(response.body));
        
      }
    })
  }

} //GitHuh


const callbacks = {
	reposCallback: function(item) {
		let repoNameArray = [];
		item.forEach(function(element) {
			repoNameArray.push(element.name);
		});
		let recentFive = repoNameArray.splice(0, 5);
		console.log("The 5 most recent repos for " + cliEntry.cliUserName.toUpperCase() + " are ===> ");
		console.log(recentFive);
	},

} //callbacks

const githuh = new GitHuh(key.key);

if (command === "repos") {
	githuh.repos(cliEntry.cliUserName, callbacks.reposCallback);
} else if (command === "stars") {
	githuh.stars(cliEntry.cliUserName, callback);
} else if (command === "profile") {
	githuh.profile(cliEntry.cliUserName, callback);
} else {
	console.log("'" + command + "'" + " is an invalid command");
}
















