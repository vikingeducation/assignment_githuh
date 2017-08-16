// require the request library
const request = require('request')

// set up the base URI for the api
const baseUri = "https://api.github.com/users"

// set up a class for this API Info
class GitHub {
  constructor(userAgent) {
    this.userAgent = userAgent
  }

  // set up method to make the api call and return results
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

  // take the cli input and print out a list of user repo names
  repos(cmdUsername) {
    // define what should happen to the returned api data
    function printout(username, jsonBody){
      var repos = jsonBody;
      console.log('------------------------------');
      console.log(`${username}'s repos:`);
      console.log('------------------------------');
      repos.forEach(function(repo){
        console.log(repo.name);
      });
    };
    // define the api endpoint for a user's repos
    var url = `${baseUri}/${cmdUsername}/repos`;
    this._sendRequest(cmdUsername, url, printout)
  }

  // take the cli input and print out a list of user starred repos
  stars(cmdUsername) {
    // define what should happen to the returned api data
    function printout(username, jsonBody){
      var repos = jsonBody;
      console.log('------------------------------');
      console.log(`${username}'s starred repos:`);
      console.log('------------------------------');
      repos.forEach(function(repo){
        console.log(repo.name);
      });
    };
    // define the api endpoint for a user's starred repos
    var url = `${baseUri}/${cmdUsername}/starred`;
    this._sendRequest(cmdUsername, url, printout)
  }

  // take the cli input and print out select profile stats for user
  profile(cmdUsername) {
    // define what should happen to the returned api data
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
    // define the api endpoint for a user's profile
    var url = `${baseUri}/${cmdUsername}`;
    this._sendRequest(cmdUsername, url, printout)
  }

}


// return the class for use in other files
module.exports = GitHub;
