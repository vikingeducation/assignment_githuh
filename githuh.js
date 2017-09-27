#! /usr/bin/env node

'use strict'

const fetch = require("node-fetch");
const USER_AGENT = 'octocat';

//secrets code below should be commented out on most systems
//secrets.js file has not been added to this repo
const secrets = require('./secrets');

const baseUri = "https://api.github.com/users/";

class Github {
	constructor(subcom, username) {
		if (typeof subcom === 'undefined' || typeof username === 'undefined') {
			console.log("Usage: ./githuh.js <profile|repos|stars> <username>");
		} else if ((subcom !== 'profile') && (subcom !== 'repos') && (subcom !== 'stars')){
			console.log("Usage: ./githuh.js <profile|repos|stars> <username>");
		} else {
			switch(subcom) {
				case "profile": this.profile(username); break;
				case "repos": this.repos(username); break;
				case "stars": this.stars(username); break;
			}
		};
	}
}	

Github.prototype.repos = function(username) {
	this.url = baseUri + username + "/repos"
	this._sendRequest(this.url);
};

Github.prototype.stars = function(username) {
	this.url = baseUri + username + "/starred"
	this._sendRequest(this.url);
};

Github.prototype.profile = function(username) {
	this.url = baseUri + username;
	this._sendProfileRequest(this.url);
};

Github.prototype._sendRequest = function(url) {
	var options = {"headers": {"User-Agent": USER_AGENT}};

	fetch(url, options)
    .then(function(res) {
        return res.json();
    }).then(function(json) {
    	//console.log(json);
    	for(var i=0; i < json.length; i++) {
	        console.log(json[i].name);
    	};
    }).catch(function(err) {
    	console.log(err);
    });
};

Github.prototype._sendProfileRequest = function(url) {
	var options = {"headers": {"User-Agent": "octocat"}};

	fetch(url, options)
    .then(function(res) {
        return res.json();
    }).then(function(json) {
    	//console.log(json);
        console.log(`name: ${json.name}`);
        console.log(`company: ${json.company}`);
        console.log(`blog: ${json.blog}`);
        console.log(`location: ${json.location}`);
        console.log(`webpage: ${json.html_url}`);
    }).catch(function(err) {
    	console.log(err);
    });
};

new Github(process.argv[2], process.argv[3]);

/*
for(var i=0; i < process.argv.length; i++) {
	console.log(i + ': ' + process.argv[i]);
}
*/
