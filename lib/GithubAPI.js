const request = require('request')
const secrets = require('../secrets')

class GithubAPI {
  constructor(){
    this.key = "?client_id=" + secrets.id + "?client_secret=" + secrets.secret;
    this.options = {
      url: "https://api.github.com",
      headers: {
        'User-Agent': 'tim5046'
      }
    };
  }

  repos(user, callback){
    this.options.url = `${this.options.url}/users/${user}/repos${this.key}`
    this._sendRequest(this.options, user, callback)
  }

  stars(user, callback){
    this.options.url = `${this.options.url}/users/${user}/starred${this.key}`
    this._sendRequest(this.options, user, callback)
  }

  profile(user, callback){
    this.options.url = `${this.options.url}/users/${user}${this.key}`
    this._sendRequest(this.options, user, callback)
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