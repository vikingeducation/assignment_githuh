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
		this._sendRequest(callback, cliEntry.cliUserName, "repos", "?sort=pushed");
	}

	stars(user, callback) {
		this._sendRequest(callback, cliEntry.cliUserName, "starred", "?sort=pushed");
	}

	profile(user, callback) {
		this._sendRequest(callback, cliEntry.cliUserName);
	}

	_sendRequest(callback, user, type, parameters) {
	    let url = "";
	    let params = parameters;

		if (params !== undefined) {
	    	url = `${baseUri}/users/${user}/${type}${parameters}`;
	    } else {
	    	url = `${baseUri}/users/${user}`;
	    }

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
		    } else {
		    	console.log("ERROR. Github server responded with status code " + response.statusCode + ".");
		    };

	    });

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

	starsCallback: function(item) {
		let starredArray = [];
		item.forEach(function(element) {
			starredArray.push(element.name);
		});
		console.log(cliEntry.cliUserName.toUpperCase() + "'s starred repos are ===> ");
		console.log(starredArray);
	},

	profileCallback: function(item) {
		if (item == false) {
			console.log("NOT FOUND");
		}
		console.log(cliEntry.cliUserName.toUpperCase() + "'s profile data is ===> ");
		console.log(item);
	},

} //callbacks

const githuh = new GitHuh(key.key);

if (command === "repos") {
	githuh.repos(cliEntry.cliUserName, callbacks.reposCallback);
} else if (command === "stars") {
	githuh.stars(cliEntry.cliUserName, callbacks.starsCallback);
} else if (command === "profile") {
	githuh.profile(cliEntry.cliUserName, callbacks.profileCallback);
} else {
	console.log("'" + command + "'" + " is an invalid command");
}
