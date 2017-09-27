var request = require("request");
var _ = require("underscore");

var api = "https://api.github.com/users/";
var user = "jaredjgebel/";
var section = "repos";

var options = {
  method: "GET",
  url: api + user + section,
  headers: {
    accept: "application/vnd.github.v3+json",
    "User-Agent": "b3a5623b072a615ce663366d750cc25e1c6de8c3"
  }
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);

  var obj = JSON.parse(body);
  var userObject = {};
  obj.forEach(function(obj) {
    var repoDate = obj.created_at;
    var repoName = obj.name;
    var pairArray = [];
    pairArray.push(repoDate);
    pairArray.push(repoName);
    userObject.push(pairArray);
  });
  console.log(dateArray);
});
