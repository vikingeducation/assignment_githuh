const request = require('request');

const baseUri = "https://api.github.com/users/"


//module
class gitHuh {
  constructor(user) {
    this.user = user
  }

  //normal user info
  //type is undfined
  getUserProfileInfo(cmdusername, callback) {
    this._sendRequest(cmdusername, callback)
  }

  //get info
  getRepos(cmdusername) {
    this._sendRequest(cmdusername, callback, repos)
  }

  getStarred(cmdusername) {
    this._sendRequest(username, callback, starred)
  }


  //sendfunction
  _sendRequest(user, callback, type) {

    var options = {
      url: `${baseUri}${cmdusername}/${type}`,
      method: 'GET',
      headers: {'User-Agent': "coelacanth7"}
    };

    if (type === undefined){
      options.url = `${baseUri}${cmdusername}`
    }

    request(options, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(body).results)
      } else {
        console.log(options.url)
        console.log("Oh no error", error) ;
        console.log(response.statusCode);
      };
    });
  }//_sendRequest

}//end module

module.exports = gitHuh

/*
githuh repos <username> should return a list of the user's recent repos.
githuh stars <username> should return a list of the user's starred repos.
githuh profile <username> should return the user's profile information (email, number of public repos, follower/following count, etc.)
Any other fun/interesting/useless commands you'd like to implement.
*/
