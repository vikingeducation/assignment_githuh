const request = require('request');

const baseUri = "https://api.github.com/users";

class GitHub {
  constructor(apiKey) {
    this.apiKey = apiKey;
  };

  repos(username, callback) {
    this._sendRequest("repos", callback)
  };

  stars(username, callback) {
    this._sendRequest("stars", callback)
  };

  profile(username, callback) {
    this._sendRequest("profile", callback)
  };

  _sendRequest(username, callback) {
    var url = `${baseUri}/${username}/` + `?access_token=${this.apiKey}`;

    request({
      url: url,
      headers: { "User-Agent": "jazairi" }
    },
    function(err, res, body) {
      if (!err && res.statusCode === 200) {
        callback(JSON.parse(body));
      }
      else if (err) {
        console.log(err)
      }
    });
  };
}

module.exports = GitHub;
