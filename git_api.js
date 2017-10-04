"use strict";

const request = require('request');
const baseUri = "https://api.github.com";

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
    		"sort": "push" //YOUAREHERE - 'sort' doesn't work
    		}
    	};
    console.log(options);

    request.get(options, function(error, response, body) {
     
      
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

const githuh = new GitHuh("ca995cc2136c035290d7216b153cea3a0e47b0cd");
githuh.repos("stevenvz", callback);