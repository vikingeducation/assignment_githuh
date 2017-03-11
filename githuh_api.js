const request = require("request");
const baseUrl = "https://api.github.com/users";


class Githuh {
  constructor(token) {
    this.token = token;
  };

  /*Searching for user (myself)*/
  searchforUser(callback) {
    var url = "https://api.github.com/search/users"
            + `?q=nategthomas&access_token=${this.token}`;
    this.requester(url, callback);
  };


  repos(user, callback) {
    var url = `${baseUrl}/${user}/repos`
            + `?type=owner&sort=pushed&direction=asc&access_token=${this.token}`;
    this.requester(url, callback);
  };

  stars(user, callback) {
    var url = `${baseUrl}/${user}/starred`
            + `?sort=created&direction=asc&access_token=${this.token}`;
    this.requester(url, callback);
  };

  profile(user, callback) {
    var url = `${baseUrl}/${user}`
            + `?access_token=${this.token}`;
    this.requester(url, callback);
  };

  requester(url, callback) {
    let options = {
      url: url,
      headers: { "User-Agent": "nategthomas" }
    };
    request(options, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        callback(JSON.parse(body));
      };
    });
  };
}

module.exports = Githuh;
