const request = require('request')

const baseUri = "https://developer.github.com/v3"

class Commands {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  repos(username) {
    this._sendRequest("/users/:username/repos")
  }

  stars(username) {
    this._sendRequest("/repos/:owner/:repo/stargazers")
  }

profile(username) {
    this._sendRequest("/users/:username")
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
