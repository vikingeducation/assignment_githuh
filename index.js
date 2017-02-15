#!/usr/bin/env node
require("dotenv").config();

const program = require('commander');
const Github = require("./github_api");

const github = new Github(process.env.GITHUB_API_KEY);

program
  .command("repos <user>")
  .description("list repositories for user")
  .action( (user) => {
    github.repos(user, (repos) => {
      if (repos.length > 0) {
      console.log(`${user}'s repos:`);
      repos.forEach( (repo) => {
        console.log(repo.name);
      });
      } else {
      console.log("No repos found.")
      };
    console.log();
    });
  });

program
  .command("stars <user>")
  .description("list starred repositories for user")
  .action( (user) => {
    github.starred(user, (starred) => {
      if (starred.length > 0) {
        console.log(`${user}'s starred repos:`);
        starred.forEach( (repo) => {
          console.log(repo.name);
        });
      } else {
        console.log("No stars found.");
      };
      console.log();
    });
  });

program
  .command("profile <user>")
  .description("display profile information")
  .action( (user) => {
    github.profile(user, (profile) => {
      console.log(`Username: ${profile.login}`);
      console.log(`Email: ${profile.email}`);
      console.log(`Public Repos: ${profile.public_repos}`);
      console.log(`Followers: ${profile.followers}`);
      console.log(`Following: ${profile.following}`);
      console.log();
    });
  });

program.parse(process.argv);
