var request = require('request')
var github = require('octonode')
var fs = require('fs')

var client = github.client();

var ghme           = client.me();
var ghuser         = client.user('memyselfandhai');
var ghrepo         = client.repo('memyselfandhai/hub');
var ghorg          = client.org('flatiron');
var ghissue        = client.issue('memyselfandhai/hub', 37);
var ghmilestone    = client.milestone('memyselfandhai/hub', 37);
var ghlabel        = client.label('memyselfandhai/hub', 'todo');
var ghpr           = client.pr('memyselfandhai/hub', 37);
var ghrelease      = client.release('memyselfandhai/hub', 37);
var ghgist         = client.gist();
var ghteam         = client.team(37);
// var ghproject      = client.project('memyselfandhai/hub', 37);
var ghnotification = client.notification(37);

var ghsearch = client.search();


// GITHUH REPOS
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
ghuser.repos(repo_callback);


// GITHUH STARS

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

request(options, callback);


// GITHUH PROFILE

var info_callback = function (err, data, headers) {
  var profile_filter = ['email', 'public_repos', 'followers', 'following']
  console.log("error: " + err);
  console.log("data: " + JSON.stringify(data, profile_filter, 1));
  console.log("headers:" + headers);
}

//
ghuser.info(info_callback);
