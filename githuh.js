const program = require('commander')
const request = require('request');
const headers = {'User-Agent':'gregfilipczak'}
const baseURI = 'https://api.github.com/users/'

program.parse(process.argv);

var makeCall = function(searchParam, user){
  const URI = baseURI + user + '/repos'
  const profileURI = baseURI + user
  switch (searchParam){
    case 'repos':
      call(URI, parseRepos)
      break;
    case 'stars':
      call(URI, parseStars)
      break;
    case 'profile':
      call(profileURI, parseProfile)
  }
}

var call = function(url, callback) {
  request({url: url, headers: headers}, function (error, response, body) {
    var data = JSON.parse(body)
    callback(data)
  });
}

var parseRepos = function(data){
  for (var i=0; i<10; i++){
    console.log(data[i].name)
    console.log(data[i].html_url)
    console.log('------------------------')
  }
}

var parseStars = function(data){
  for (var i=0; i<10; i++){
    if (data[i].stargazers_count > 0){
      console.log(data[i].name)
      console.log(data[i].html_url)
      console.log('------------------------')
    }
  }
}

var parseProfile = function(data){
  console.log('Email: ' + data.email);
  console.log('Bio: ' + data.bio);
  console.log('Repos: ' + data.public_repos);
  console.log('Number of followers: ' + data.followers);
}


makeCall(program.args[0], program.args[1])
