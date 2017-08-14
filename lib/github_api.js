// require the request library
const request = require('request')

// set up the base URI for the api
const baseUri = "https://api.github.com/users"

// set up a class for this API Info
class GitHub {
  constructor(userAgent) {
    this.userAgent = userAgent
  }

  // print out a list of user repo names
  repos(username){
    var options = {
      url: `${baseUri}/${username}/repos`,
      headers: {
        'User-Agent': this.userAgent
      }
    };
    request(options, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        var repos = JSON.parse(body);
        console.log('------------------------------');
        console.log(`${username}'s repos:`);
        console.log('------------------------------');
        repos.forEach(function(repo){
          console.log(repo.name);
        });
      } else {
        console.log('Error: ' + error);
      }
    })
  }

  // print out a list of user starred repos
  stars(username){
    var options = {
      url: `${baseUri}/${username}/starred`,
      headers: {
        'User-Agent': this.userAgent
      }
    };
    request(options, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        var stars = JSON.parse(body);
        console.log('------------------------------');
        console.log(`${username}'s starred repos:`);
        console.log('------------------------------');
        stars.forEach(function(repo){
          console.log(repo.name);
        });
      } else {
        console.log('Error: ' + error);
      }
    })
  }

}


// return the class for use in other files
module.exports = GitHub;
