const request = require('request');
const baseUri = "http://api.github.com/users";

class Github {

  repos(user, callback) {
    this._sendRequest(`${baseUri}/${user}/repos`
                      + `?sort=created`, callback)
  }
  starred(user, callback) {
    this._sendRequest(`${baseUri}/${user}/starred`, callback)
  }
  profile(user, callback) {
    this._sendRequest(`${baseUri}/${user}`, callback)
  }
  _sendRequest(url, callback) {
    request({
      url: url,
      headers: {'user-agent': 'eglital'},
      json: true
    }, function(err, res, body) {
      if(!err & res.statusCode === 200) {
        callback(body);
      } else {
        console.log("error: " + err)
      }

    })
  }
}

module.exports = Github;