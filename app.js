'use strict';

const request = require('request');
const gitHuh = request.defaults({
  headers: { 'User-Agent': 'Seeker0' }
});
const baseUri = 'https://api.github.com/users';

const repos = user => gitGet(printNames, `${baseUri}/${user}/repos`);
const starred = user => gitGet(printNames, `${baseUri}/${user}/starred`);
const profile = user => gitGet(printAttr, `${baseUri}/${user}`);
const gitGet = (callback, url) => {
  gitHuh.get(url, (error, response, body) => {
    if (error) {
      console.error(error);
    }
    callback(JSON.parse(body));
  });
};
const printNames = repoArr => repoArr.forEach(repo => console.log(repo.name));
//email, public repos, follower, following count, name, blog
const printAttr = obj =>
  attrArr.forEach(val => console.log(`${val}: ${obj[val]}`));
const attrArr = [
  'name',
  'email',
  'bio',
  'blog',
  'public_repos',
  'followers',
  'following'
];
