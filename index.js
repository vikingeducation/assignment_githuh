var request = require('request')
var github = require('octonode')
var fs = require('fs')

var client = github.client();

// var client = github.client({
//   username: 'memyselfandhai',
//   password: 'Nsx81717'
// });

// client.get('/users/memyselfandhai', {}, function (err, status, body, headers) {
//   console.log(body); //json object
// });

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

// working!!
ghuser.repos(repo_callback);



// pulls all starred user repos
var starred_callback = function (err, data, headers) {
  var repo_filter = ['name', 'description', 'updated_at']

  console.log("error: " + err);
  console.log("data: " + JSON.stringify(data, repo_filter, 5));
  console.log("headers:" + headers);
};

// working!!
ghme.starred(starred_callback)

var info_callback = function (err, data, headers) {
  var profile_filter = ['email', 'public_repos', 'followers', 'following']
  console.log("error: " + err);
  console.log("data: " + JSON.stringify(data, profile_filter, 1));
  console.log("headers:" + headers);
}

//
// ghuser.info(info_callback);
