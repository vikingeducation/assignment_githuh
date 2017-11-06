var test = [{updated: "2011-08-08T22:26:40Z"}, {updated:"2017-10-14T22:45:49Z"},
{updated:"2010-10-31T00:39:21Z"}]

var request = require('request')
var curl = require('curl-cmd');
var http = require('http')

// console.log(Date.parse("2000-08-08T22:26:40Z"))

// sorted by most recent
// console.log(test.sort().reverse())


// console.log(test.sort(function (a,b) {
//   return Date.parse(a.updated) - Date.parse(b.updated);
// }))

address = 'https://api.github.com/users/memyselfandhai/starred';

//request http calls

// var starred = request(address, function (error, response, body) {
//   console.log('error:', error);
//   console.log('statusCode:', response && response.statusCode);
//   console.log('body:', body);
// });

// github node.js library call

// var callback = request('address', function (err, data, headers) {
//   var repo_filter = ['name', 'description', 'updated_at']
//
//   console.log("error: " + err);
//   console.log("data: " + data);
//   console.log("headers:" + headers);
// });




var options = {
  url: address,
  headers: {
    'User-Agent': 'request'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
  }
}

request(options, callback);
