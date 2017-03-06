#!/usr/bin/env node
const Github = require('./github_api.js');
const github = new Github();

var username = process.argv[3];
var search_type = process.argv[2];
console.log(`Searching for ${search_type} of ${username}`);

if (search_type === "repos") {
    github.repos(username, function(data) {
        data.forEach(function(repo) {
            console.log(repo.name)
        })
    })
} else if (search_type === "starred") {
    github.starred(username, function(data) {
        data.forEach(function(star) {
            console.log(star.name)
        })
    })
} else if (search_type === "profile") {
    github.profile(username, function(data) {
        console.log(`Email: ${data.email}. Number of public repos: ${data.public_repos}. Followers: ${data.followers}. Following: ${data.following}.`)
    })
} else {
    throw new Error("Search type is not correct")
}
