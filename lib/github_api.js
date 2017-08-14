// require the request library
const request = require('request')

// set up the base URI for the api
const baseUri = "https://api.github.com/users"

// set up a class for this API Info
class GitHub {
  constructor(userAgent) {
    this.userAgent = userAgent
  }
}


// return the class for use in other files
module.exports = GitHub;
