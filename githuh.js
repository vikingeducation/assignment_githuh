#!/usr/bin/env node
const request = require('request');
const program = require('commander');
const baseUri = 'https://api.github.com/users';

// API Wrapper
class GitHuh {
    constructor(user) {
        this.user = user;
    }
    repos(callback) {
        this._sendRequest("repos", callback);
    }
    stars(callback) {
        this._sendRequest("starred", callback);
    }
    profile(callback) {
        this._sendRequest("profile", callback);
    }
    followers(callback) {
        this._sendRequest("followers", callback);
    }
    _sendRequest(type, callback) {
        var url = "";
        if (type === "profile") {
            url = `${baseUri}/${this.user}`
        } else {
            url = `${baseUri}/${this.user}/${type}`;
        }

        var baseRequest = request.defaults({
            headers: {'User-Agent': 'githuh'}
        });

        baseRequest(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(JSON.parse(body));
            } else {
                console.error(JSON.parse(body));
            }
        });
    }
}

// Implementation

program
    .version('0.0.1')
    .usage('repos <user>\n\t githuh stars <user> \n\t githuh profile <user>')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
} else {
    var command = program.args[0];
    var user = program.args[1];
    const githuh = new GitHuh(user);

    if (command === "repos") {
        console.log(user + "'s repositories:");
        githuh.repos(function(repos) {
            repos.forEach((repo) => {console.log(repo.name)});
        });
    } else if (command === "stars") {
        console.log(user + "'s starred repositories:");
        githuh.stars(function(stars) {
            stars.forEach((stars) => {console.log(stars.name)});
        });
    } else if (command === "profile") {
        console.log(user + "'s profile information:");
        githuh.profile(function(profile) {
            for (var prop in profile){
                console.log(prop + ": " + profile[prop]);
            }
        });
    } else if (command === "followers") {
        console.log(user + "'s current followers:");
        githuh.followers(function(followers) {
            followers.forEach((follower) => {console.log(follower.login)});
        });
    } else {
        program.help();
    }
}