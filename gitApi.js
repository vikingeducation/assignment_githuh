const request = require('request')

  var prompt = require('prompt');
var GitHub = require('github-api');
var github = new GitHub({

    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
    },

    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});




prompt.get(['username'], function (err, result) {
  if (err) { return onErr(err); }
  console.log('  Username: ' + result.username);
var me = github.getUser(result.username);

me.listRepos(function(err, repos) {
   // look at all the starred repos!
   console.log("First Repo: " + repos[1].name);

 });


});
