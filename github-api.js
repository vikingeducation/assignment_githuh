#!/usr/bin/env node

const program = require('commander');
// Promise based HTTP client for browser and node
const axios = require('axios');

// Github API
const baseUri = 'https://api.github.com/users/'


class githubApi {
  constructor(username) {
    this.username = username;
  }

  // GET user profie from Github
  getProfile() {
    axios.get(baseUri + this.username)

      // if successful
      .then((res) => {
        // return email, # of public repos, followers/following count, etc
        const userData = res.data;
        const userProfile = {
          name: userData.name,
          about: userData.bio,
          username: userData.login,
          email: userData.email,
          'public repos': userData.public_repos,
          followers: userData.followers,
          following: userData.following,
        };

        console.log(userProfile);
      })

      // if error
      .catch((err) => {
        console.log(err);
      })
  }

  getRepos() {

    axios.get(baseUri + this.username + '/repos')

      // if successful
      .then((res) => {
        // return repo name, url, description
        const repoData = res.data;
        const repos = [];

        repoData.forEach((repo) => {
          const shortRepoData = {
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
          };

          repos.push(shortRepoData);
        })

        console.log(repos);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getStarredRepos() {
    axios.get(baseUri + this.username + '/starred')
      .then((res) => {
        const starredData = res.data;

        const starredRepos = starredData.map((repo) => {
          return repo.html_url;
        })

        console.log(starredRepos);
      })
      .catch((err) => {
        console.log(err);
      })
  }

}


// interactive command line
program
  .version('1.0.0')
  .description('Command line program: Githuh');

// returns github profiles
program
  .command('profile <username>')
  .alias('p')
  .description('Get github profile of user')
  .action((username) => {
    const user = new githubApi(username);
    user.getProfile();
  })

// returns github repos
program
  .command('repos <username>')
  .alias('r')
  .description('Get github repos of user')
  .action((username) => {
    const user = new githubApi(username);
    user.getRepos();
  })

// returns github starred repos
program
  .command('starred <username>')
  .alias('s')
  .description('Get github starred repos of user')
  .action((username) => {
    const user = new githubApi(username);
    user.getStarredRepos();
  })



program.parse(process.argv);
