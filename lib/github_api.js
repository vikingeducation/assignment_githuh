// require the request library
const request = require('request')

// set up the base URI for the api
const baseUri = "https://api.github.com/users"

// set up a class for this API Info
class GitHub {
  constructor(userAgent) {
    this.userAgent = userAgent
  }

  _sendRequest(username, url, printout_callback) {
    var options = {
      url: url,
      headers: {
        'User-Agent': this.userAgent
      }
    }
    request(options, function(error, response, body){
      if (!error & response.statusCode === 200) {
        printout_callback(username, JSON.parse(body));
      }
    })
  }

  // print out a list of user repo names
  repos(cmdUsername) {
    function printout(username, jsonBody){
      var repos = jsonBody;
      console.log('------------------------------');
      console.log(`${username}'s repos:`);
      console.log('------------------------------');
      repos.forEach(function(repo){
        console.log(repo.name);
      });
    };

    var url = `${baseUri}/${cmdUsername}/repos`;
    this._sendRequest(cmdUsername, url, printout)
  }

  // print out a list of user starred repos
  stars(cmdUsername) {
    function printout(username, jsonBody){
      var repos = jsonBody;
      console.log('------------------------------');
      console.log(`${username}'s starred repos:`);
      console.log('------------------------------');
      repos.forEach(function(repo){
        console.log(repo.name);
      });
    };

    var url = `${baseUri}/${cmdUsername}/starred`;
    this._sendRequest(cmdUsername, url, printout)
  }

  // print out select profile stats for user
  profile(cmdUsername) {
    function printout(username, jsonBody){
      var profileStats = jsonBody;
      console.log('------------------------------');
      console.log(`${username}'s profile info:`);
      console.log('------------------------------');
      console.log(`username: ${username}`);
      console.log(`actual name: ${profileStats.name}`);
      console.log(`url: ${profileStats.html_url}`);
      console.log(`email: ${profileStats.email}`);
      console.log(`blog: ${profileStats.blog}`);
      console.log(`public repos: ${profileStats.public_repos}`);
      console.log(`followers: ${profileStats.followers}`);
      console.log(`following: ${profileStats.following}`);
    };

    var url = `${baseUri}/${cmdUsername}`;
    this._sendRequest(cmdUsername, url, printout)
  }

}


// return the class for use in other files
module.exports = GitHub;
