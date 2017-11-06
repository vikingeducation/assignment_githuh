var request = require('request')
var github = require('octonode')
var fs = require('fs')
var prompt = require('prompt');

var client = github.client();

var ghme           = client.me();
var ghuser         = client.user('memyselfandhai');
var ghrepo         = client.repo('memyselfandhai/hub');


//---------------------------------------
//
// GIT HUH RECENT REPOS
//
//---------------------------------------
// pulls all user repos, sorts by date, and returns the 5 most recently updated

var repo_callback = function(err, data, headers) {
  // filter for only important stuff
  var repo_filter = ['name', 'description', 'updated_at']
  // sorting returned JSON by updated_at key
  sorted = data.sort(function (a,b) {
    return Date.parse(b.updated_at) - Date.parse(a.updated_at);
  })

  console.log("error: " + err);
  console.log("data: " + JSON.stringify(sorted.slice(0,5), repo_filter, 5));
  console.log("headers:" + headers);
};
//
// // working!!
// ghuser.repos(repo_callback);


//---------------------------------------
//
// GIT HUH STARRED REPOS
//
//---------------------------------------

// pulls all starred user repos
// var starred_callback = function (err, data, headers) {
//   var repo_filter = ['name', 'description', 'updated_at']
//
//   console.log("error: " + err);
//   console.log("data: " + JSON.stringify(data, repo_filter, 5));
//   console.log("headers:" + headers);
// };

// working!!
// ghme.starred(starred_callback)

// starred callback v2, now with auth !
var address = 'https://api.github.com/users/memyselfandhai/starred';
var options = {
  url: address,
  headers: {
    'User-Agent': 'request'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    info = JSON.stringify(info, ['name', 'description', 'updated_at'], 1)
    console.log(info);
  }
}

// working!!
// request(options, callback);


//---------------------------------------
//
// GITHUH PROFILE
//
//---------------------------------------

var info_callback = function (err, data, headers) {
  var profile_filter = ['email', 'public_repos', 'followers', 'following']
  console.log("data: " + JSON.stringify(data, profile_filter, 1));
}

// working!!
// ghuser.info(info_callback);

//---------------------------------------
//
// GITHUH ORGANIZATIONS
//
//---------------------------------------

var org_callback = (err, data, headers) => {
  if (data.length === 0) {
    console.log("0 organizations =(")
  } else {
    console.log(data)}
}

//---------------------------------------
//
// CLI BITS
//
//---------------------------------------

prompt.start();

 //
 // Get two properties from the user: username and email
 //
 console.log("You have 3 options for requests: repos, starred, info, orgs")
 prompt.get(['github', 'request'], function (err, result) {
   if (result.request === 'info') {
         client.user(result.github).info(info_callback)
   } else if (result.request === 'starred') {
          var address = `https://api.github.com/users/${result.githubSeeker}/starred`;
          var options = {
              url: address,
              headers: {
                'User-Agent': 'request'
              }
            };
          request(options, callback);
    } else if (result.request === 'repos') {
       client.user(result.github).repos(repo_callback)
    } else if (result.request === 'orgs') {
       client.user(result.github).orgs(org_callback)
    }
  });
