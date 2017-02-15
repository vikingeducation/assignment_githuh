const request = require("request");
const baseUri = "https://api.github.com/users";

class Github {
  constructor(apiKey) {
    this.apiKey = apiKey;
  };

  repos(user, callback) {
    let url = `${baseUri}/${user}/repos`
            + `?sort=created&access_token=${this.apiKey}`;
    this._sendRequest(url, callback);
  };

  starred(user, callback) {
    let url = `${baseUri}/${user}/starred`
            + `?sort=created&access_token=${this.apiKey}`;
    this._sendRequest(url, callback);
  };

  profile(user, callback) {
    let url = `${baseUri}/${user}`
            + `?access_token=${this.apiKey}`;
    this._sendRequest(url, callback);
  };

  _sendRequest(url, callback) {
    let options = {
      url: url,
      headers: { "User-Agent": "blackwright" }
    };
    request(options, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        callback(JSON.parse(body));
      };
    });
  };
}

module.exports = Github;
