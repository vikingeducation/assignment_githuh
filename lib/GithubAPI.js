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
    this._sendRequest('repos', user, callback)
  }

  _sendRequest(type, user, callback){
    options.url = `${options.url}/users/${user}/${type}${param}`
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200 || response.statusCode == 404) {
        callback(JSON.parse(body))
      }
    })
  }
}


module.exports = GithubAPI;