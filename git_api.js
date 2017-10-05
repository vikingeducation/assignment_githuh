"use strict";

const request = require('request');
const baseUri = "https://api.github.com";
const key = require('./config/setup');

class GitHuh {
	constructor(apiKey) {
		this.apiKey = "token " + apiKey;
	}

	repos(user, callback) {
		this._sendRequest("repos", user, callback);
	}

	stars(user, callback) {

	}

	profile(user, callback) {

	}

	_sendRequest(type, user, callback) {
    const url = `${baseUri}/users/${user}/${type}`;
    const options = {
    	url: url,
    	headers: {
    		"User-Agent": "stevenvz",
    		"Authorization": this.apiKey,
    		"sort": "pushed"
    		}
    	};
    console.log(options);

    request.get(options, function(error, response, body) {
     
      console.log(response.statusCode);
      if (!error & response.statusCode === 200) {
        
        callback(JSON.parse(response.body));
        
      }
    })
  }

} //GitHuh


const callback = function(item) {
	let repoNameArray = [];
	item.forEach(function(element) {
		repoNameArray.push(element.name);
	});
	console.log(repoNameArray);
};

const githuh = new GitHuh(key.key);
githuh.repos("stevenvz", callback);