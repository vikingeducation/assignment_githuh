let request = require("request"),response = "",
    responses = [], url = "",
    returnOptions = (url, headers) => ({
      url: url,
      headers: headers
    }),
    validateRequest = (error, response, body) => {
      response = JSON.parse(body)
      if (Array.isArray(response)){
        response.forEach( ( item ) => {
          item = item.name
          responses.push(item)
        } )
        console.log(responses)
        } else {
          for (var item in response){
            console.log(response[item])
          }
      }
    }

switch(process.argv[3]){
  case "repos":
    url = "https://api.github.com/users/"+ process.argv[2] +"/repos"
    break
  case "starred":
    url = "https://api.github.com/users/"+ process.argv[2] +"/starred"
    break
  case "profile":
    url = "https://api.github.com/users/"+ process.argv[2]
    break
}

request(returnOptions(url + "?access_token=f95d896b1dcc77363ae73e5a6756bc31217562ce",
{'User-Agent': 'request'}), validateRequest)


module.exports = returnOptions

