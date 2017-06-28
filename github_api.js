const request = require('request')

const baseUri = "http://api.nytimes.com/svc/mostpopular/v2"

class TheTimes {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  mostEmailed(callback) {
    this._sendRequest("mostemailed", callback)
  }

  mostViewed(callback) {
    this._sendRequest("mostviewed", callback)
  }

  mostShared(callback) {
    this._sendRequest("mostshared", callback)
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



const times = new TheTimes("00030b263a76424891a84a63ac65b736")

times.mostEmailed(function(articles) {
  console.log("Most Emailed")
  console.log("=====")
  articles.forEach(article => { console.log(article.title) })
})

times.mostViewed(function(articles) {
  console.log(" ")
  console.log("Most Viewed")
  console.log("=====")
  articles.forEach(article => { console.log(article.title) })
})

times.mostShared(function(articles) {
  console.log(" ")
  console.log("Most Shared")
  console.log("=====")
  articles.forEach(article => { console.log(article.title) })
})
