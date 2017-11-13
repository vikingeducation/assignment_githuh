#! /usr/bin/env node

// --------------------- CONSTANTS ------------------------

const BASE_URI = 'https://api.github.com/users';
const INFO = process.argv[2];
const USER = process.argv[3];

// -------------------- API WRAPPER -----------------------

// Set up request object
let request = require('request');
let githuh = request.defaults({
  headers: {'User-Agent':'johnrpb'}
});

let wrapperCallAPI = (url, consolePrintHandler) => {
  githuh.get(url, (err, res, body) => {
    if (err) console.error(err);
    consolePrintHandler(JSON.parse(body));
  });
};

// ---------------- HANDLERS FOR WRAPPER ------------------

let printNameHandler = (repos) => {
  repos.forEach((repo) => {
    console.log(repo.name);
  });
};

const DATA_REQUESTED = ['name', 'email','public_repos', 'followers'];

let printProfileDataHandler = (profileObj, dataRequested) => {
  DATA_REQUESTED.forEach((attr) => {
    console.log(`${attr}: ${profileObj[attr]}`);
  });
}

// -------------------- OPERATION ------------------------

switch(INFO) {
  case 'repos':
    wrapperCallAPI(`${BASE_URI}/${USER}/${INFO}`, printNameHandler);
    break;
  case 'stars':
    wrapperCallAPI(`${BASE_URI}/${USER}/starred`, printNameHandler);
    break;
  case 'profile':
    wrapperCallAPI(`${BASE_URI}/${USER}`, printProfileDataHandler);
    break;
  default:
    console.log( "not a recognized call");
}


