var test = [{updated: "2011-08-08T22:26:40Z"}, {updated:"2017-10-14T22:45:49Z"},
{updated:"2010-10-31T00:39:21Z"}]

var request = require('request')

// console.log(Date.parse("2000-08-08T22:26:40Z"))

// sorted by most recent
// console.log(test.sort().reverse())


// console.log(test.sort(function (a,b) {
//   return Date.parse(a.updated) - Date.parse(b.updated);
// }))

address = 'https://api.github.com/users/memyselfandhai';

//basic request callback

var starred = request(address, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

// var callback = request('address', function (err, data, headers) {
//   var repo_filter = ['name', 'description', 'updated_at']
//
//   console.log("error: " + err);
//   console.log("data: " + data);
//   console.log("headers:" + headers);
// });
