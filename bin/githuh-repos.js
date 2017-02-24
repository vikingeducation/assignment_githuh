#! /usr/bin/env node

"use strict";

const request = require("request");
const {username, password} = require("../auth.js");
const Githuh = require("../app.js");


/*Base Uris for API calls*/
/*  "user_url": "https://api.github.com/users/{user}",
    "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
    "starred_url": "https://api.github.com/user/starred{/owner}{/repo}",
*/
const typeOfLookup = process.argv[2];
const userToLookup = process.argv[3];

let githuh = new Githuh(username, password);
let apiResponse;
debugger;

if (typeOfLookup == "repos") {
    //call userRepoLookup
    apiResponse = githuh.userRepoLookup(userToLookup);
}
else if (typeOfLookup == "stars") {
    //call userStarsLookup
    apiResponse = githuh.userStarsLookup(userToLookup);
}
else if (typeOfLookup == "profile") {
    // call userProfileLookup
    apiResponse = githuh.userProfileLookup(userToLookup);
}
else {
    throw new Error;
}
console.log(apiResponse);

