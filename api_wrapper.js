const request = require('request');

const baseUri = "https://api.github.com/users/"

//module
class gitHuhModule {

  //no authentication set up
  constructor(user) {
    this.user = user
  }

  //normal user info
  //type is undfined so url is shortened
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
      //url for repos and starred
      url: `${baseUri}${username}/${type}`, //no authentication
      method: 'GET',
      headers: {
        'User-Agent': "coelacanth7"
      }
    };

    //special case url for user profile info
    if (type === undefined) {
      options.url = `${baseUri}${username}` //no authentication
    }

    request(options, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(body))
        //console.log('this is the raw data' + body)
      } else {
        //error handling
        console.log(options.url)
        console.log("Oh no error", error);
        console.log(response.statusCode);
      };
    });
  } //_sendRequest

} //end module

module.exports = gitHuhModule;

/*
githuh repos <username> should return a list of the user's recent repos.
githuh stars <username> should return a list of the user's starred repos.
githuh profile <username> should return the user's profile information (email, number of public repos, follower/following count, etc.)
Any other fun/interesting/useless commands you'd like to implement.
*/