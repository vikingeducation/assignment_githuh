var request = require('request')
var github = require('octonode')
var fs = require('fs')

// var client = github.client();

var client = github.client({
  username: 'memyselfandhai',
  password: 'Nsx81717'
});

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



var callback = function(err, data, headers) {
  var repos = JSON.stringify(data, repo_filter, 1);
  // repos = repos.split(",");
  sorted = data.sort(function (a,b) {
    return a.updated_at - b.updated_at;
  })
  console.log(sorted)

  console.log("error: " + err);
  // console.log("data: " + JSON.stringify(data, repo_filter, 5));
  console.log("headers:" + headers);
};


var repo_filter = ['name', 'description', 'updated_at']

// ghme.repos(callback);
//


ghuser.repos(callback);
