const request = require('request');

require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_KEY = process.env.SECRET_KEY;

const recent_repo_url = `https://api.github.com/users/fabpot/repos?sort=updated&client_id=CLIENT_ID&client_secret=SECRET_KEY`;
const starred_repo_url = `https://api.github.com/users/fabpot/starred`;
const user_profile_url = `https://api.github.com/users/fabpot`;
const random = `https://api.github.com/users?since=135`;

//Working code - Get recent repos of a user
// request({
//   url:recent_repo_url,
//   headers: {
//     "User-Agent": "Foo"
//   }
// }, (err, response, body) => {
//   body = JSON.parse(body);
//   console.log(body);
// });

Get the starred repos of a user
request({
  url:starred_repo_url,
  headers: {
    "User-Agent": "Foo"
  }
}, (err, response, body) => {
  body = JSON.parse(body);
  console.log(body);
});

//Working code - Get the profile info of a user (Remember, if you try to use 2-factor auth for this kind of simple request, it throws an error)
// request({
//     url:user_profile_url,
//          headers: {
//            "User-Agent":"Foo"
//          }
//        }, (err, response, body) => {
//          body = JSON.parse(body);
//          console.log(body);
//        });
