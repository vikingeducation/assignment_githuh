#! /usr/bin/env node

"use strict";

const {username, password} = require("./auth.js");
const Githuh = require("@rttomlinson/githuh_wrapper");


/*Base Uris for API calls*/
/*  "user_url": "https://api.github.com/users/{user}",
    "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
    "starred_url": "https://api.github.com/user/starred{/owner}{/repo}",
*/
const typeOfLookup = process.argv[2];
const userToLookup = process.argv[3];

let githuh = new Githuh(username, password);


//Customize callback as fit
function callback(response) {
    console.log(response);
}


if (typeOfLookup == "repos") {
    //call userRepoLookup
    githuh.userRepoLookup(userToLookup, callback);
}
else if (typeOfLookup == "stars") {
    //call userStarsLookup
    githuh.userStarsLookup(userToLookup, callback);
}
else if (typeOfLookup == "profile") {
    // call userProfileLookup
    githuh.userProfileLookup(userToLookup, callback);
}
else {
    throw new Error;
}
