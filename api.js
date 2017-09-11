const request = require('request');
const baseUri = "https://api.github.com/users/";

//Githuh object
class Githuh {
  constructor(username){
    this.user = username;
  }

  repos(callback){
    this.sendRequest(`/repos`, callback)
  }

  stars(callback){
    this.sendRequest(`/starred`, callback)
  }

  profile(callback){
    this.sendRequest(``, callback)
  }

  sendRequest(path, callback){
    let url = `${baseUri}${this.user}${path}`; //https://api.github.com/users/maddiereddy/{repos||stars||profile}

    let options = {
      url: url,
      headers: {
        'User-Agent': `${this.user}`
      }
    }
  
    //request object created and callback
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