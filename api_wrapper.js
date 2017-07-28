const request = require('request');
const baseUri = "https://api.github.com/users/";

const options = {
  url: '',
  headers: {
    'User-Agent': "jeffbernst"
  }
};

class Githuh {
  constructor(username){
    this.user = username;
  }

  name(callback){
    this.sendRequest(this.user, callback)
  }

  repo(callback){
    this.sendRequest(`${this.user}/repos`, callback)
  }

  stars(callback){
    this.sendRequest(`${this.user}/starred`, callback)
  }

  profile(callback){
    this.sendRequest(`${this.user}`, callback)
  }

  sendRequest(url, callback){
    options.url = `${baseUri}${url}`;
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      }else{
        console.log("ERROR", error);
      }
    })
  }
}

module.exports = Githuh;