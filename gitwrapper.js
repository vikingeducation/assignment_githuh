const request = require('request');

function GitWrapper() {
  
  this._sendRequest = (url, callback) => {

    let options = {
      url: url,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'request',
      }
    };

    function GET(error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      } else {
        console.error(error);
      }
    }

    request(options, GET);
  };

  this.repos = (username, callback) => {
    const url = `https://api.github.com/users/${username}/repos`;
    this._sendRequest(url, callback);
  };

  this.stars = (username, callback) => {
    const url = `https://api.github.com/users/${username}/starred`;
    this._sendRequest(url, callback);
  };

  this.profile = (username, callback) => {
    const url = `https://api.github.com/users/${username}`;
    this._sendRequest(url, callback);
  };

};


module.exports = GitWrapper;
