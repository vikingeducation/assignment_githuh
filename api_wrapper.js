const request = require('request');

const baseUri = "https://api.github.com/users/"


//module
class gitHuhModule {
  constructor(user) {
    this.user = user
  }

  //normal user info
  //type is undfined
  getUserProfileInfo(username, callback) {
    this._sendRequest(username, callback)
  }

  //get info
  getRepos(username, callback) {
    this._sendRequest(username, callback, "repos")
  }

  getStarred(username, callback) {
    this._sendRequest(username, callback, "starred")
  }


  //sendfunction
  _sendRequest(username, callback, type) {

    var options = {
      url: `${baseUri}${username}/${type}`,
      method: 'GET',
      headers: {'User-Agent': "coelacanth7"}
    };

    if (type === undefined){
      options.url = `${baseUri}${username}`
    }

    request(options, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(body))
        //console.log('this is the raw data' + body)
      } else {
        console.log(options.url)
        console.log("Oh no error", error) ;
        console.log(response.statusCode);
      };
    });
  }//_sendRequest

}//end module

module.exports = gitHuhModule;

/*
githuh repos <username> should return a list of the user's recent repos.
githuh stars <username> should return a list of the user's starred repos.
githuh profile <username> should return the user's profile information (email, number of public repos, follower/following count, etc.)
Any other fun/interesting/useless commands you'd like to implement.
*/
