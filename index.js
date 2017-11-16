const request = require('request')

request('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(JSON.parse(body))
  }
})

/* 
githuh repos <username> should return a list of the user's recent repos.
githuh stars <username> should return a list of the user's starred repos.
githuh profile <username> should return the user's profile information (email, number of public repos, follower/following count, etc.)
*/