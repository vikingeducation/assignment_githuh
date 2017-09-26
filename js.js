const request = require('request')

module.exports.repos = function(user){request.get('https://api.github.com/users/'+user+'/repos?access_token=YOUR ACCESS TOKEN',{
    headers:{
      "User-Agent":"daniellabirch"
    }
  },
  function (error, response, body){
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body));
    }
})
};

module.exports.stars = function(user){request.get('https://api.github.com/users/'+user+'/starred?access_token=YOUR ACCESS TOKEN',{
    headers:{
      "User-Agent":"daniellabirch"
    }
  },
  function (error, response, body){
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body));
    }
})
};

module.exports.profile = function(user){request.get('https://api.github.com/users/'+user,{
    headers:{
      "User-Agent":"daniellabirch"
    }
  },
  function (error, response, body){
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body));
    }
})
};
