'use strict';

const request = require('request');
const gitHuh = request.defaults({
  headers: { 'User-Agent': 'Seeker0' }
});
const baseUri = 'https://api.github.com/users';

let gettingGit = function() {
  this.url = `${baseUri}`;
  this.repos = user => {
    this.url = `${baseUri}/${user}/repos`;
    return this.gitGet(obj => console.log(obj['name']));
  };
  this.starred = user => {
    this.url = `${baseUri}/${user}/starred`;
    return this.gitGet(val => console.log(val.name));
  };
  this.profile = user => {
    this.url = `${baseUri}/${user}`;
    return this.gitGet(val => console.log(Object.entries(val)));
  };
  this.gitGet = callback => {
    gitHuh.get(this.url, (error, response, body) => {
      if (error) {
        console.error(error);
      }
      let data = JSON.parse(body);
      console.log(response.statusCode);
      for (let key in data) {
        callback(data[key]);
      }
    });
  };
};

let getGit = new gettingGit();
getGit.profile('Seeker0');
