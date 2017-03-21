const request = require('request')

const secrets = require('../secrets')

const id = secrets.id;
const secret = secrets.secret;
const param = "?client_id=" + id + "?client_secret=" + secret;


var options = {
  url: "https://api.github.com",
  headers: {
    'User-Agent': 'tim5046'
  }
};

class GithubAPI {
  constructor(){}

  repos(user, callback){
    options.url = `${options.url}/users/${user}/repos${param}`
    this._sendRequest(options, user, callback)
  }

  stars(user, callback){
    options.url = `${options.url}/users/${user}/starred${param}`
    this._sendRequest(options, user, callback)
  }

  profile(user, callback){
    options.url = `${options.url}/users/${user}${param}`
    this._sendRequest(options, user, callback)
  }

  _sendRequest(urlOptions, user, callback){
    request(urlOptions, function (error, response, body) {
      if (!error && response.statusCode == 200 || response.statusCode == 404) {
        callback(JSON.parse(body))
      }
    })
  }
}


module.exports = GithubAPI;