var request = require('request');
const baseURI = "https://api.github.com/users"

var options

class GitHuh {
  constructor(username) {
    this.username = username;
  }

  repo(callback) {
    this._sendRequest("repos",callback);
  }

  stars(callback) {
    this._sendRequest("starred", callback);
  }

  profileInfo(callback) {
    this._sendRequest(undefined, callback);
  }

  _sendRequest(item, callback) {
    var url = `${baseURI}/${this.username}`
    if (item) {
      url += `/${item}`
    }
    var options = {
      url: url,
      headers: {
        'User-Agent': 'tketron'
      }
    }

    request(options, function(error, response, body) {
      if (!error & response.statusCode == 200) {
        callback(JSON.parse(body));
      }
    });
  }
}

const githuh = new GitHuh("tketron");

githuh.repo(function(data) {
  data.forEach(function(repo) {
    console.log(repo.name);
  });
});

githuh.stars(function(starred) {
  starred.forEach(function(repo) {
    console.log(repo.name);
  });
});

githuh.profileInfo(function(data) {
  console.log(`Name: ${data.name}
Location: ${data.location}`);
});
