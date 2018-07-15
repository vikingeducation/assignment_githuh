const request = require('request')

request('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(JSON.parse(body))
  }
})



// github_api.js

const request = require('request')

const baseUri = "https://api.github.com"

class GitHuh {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  reposList(callback) {
    this._sendRequest("reposlist", function(req, res) {
      GET /users/:username/repos;
    })
  }

  starredList(callback) {
    this._sendRequest("mostviewed", callback)
      GET /repos/:owner/:repo/stargazers;
  }

  profileInfo(callback) {
    this._sendRequest("mostshared", callback)
      GET /users/:username;
  }

  _sendRequest(type, callback) {
    const url = `${baseUri}/${type}/all-sections/7?api-key=${this.apiKey}`

    request(url, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(body).results)
      }
    })
  }
}


// Usage

const githuh = new GitHuh("YOUR API KEY")

githuh.repoList(function(repos) {
  console.log("Repo List")
  console.log("=====")
  repos.forEach(repo => { console.log(repo.title) })
})

githuh.starredList(function(repos) {
  console.log(" ")
  console.log("Starred Repo List")
  console.log("=====")
  repos.forEach(repo => { console.log(repo.title) })
})

githuh.profileInfo(function(repos) {
  console.log(" ")
  console.log("Profile Information")
  console.log("=====")
  repos.forEach(repo => { console.log(repo.title) })
})
