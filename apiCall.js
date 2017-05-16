var apiCall = function(url){
  request({url: url, headers: headers}, function (error, response, body) {
    console.log(JSON.parse(body))
    return JSON.parse(body)
  });
}
