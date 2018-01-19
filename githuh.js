#!/usr/bin/env node

'use strict';

const program = require('commander');
const gitwrapper = require('./gitwrapper');

const githuh = new gitwrapper();

program
  .version('1.0.0')
  .description('CLI for getting Github user information')

program
  .command('repos <username>')
  .description(`A list of the user's recent repos`)
  .action( username => githuh.repos(username, repos => {
    repos.forEach( repo => {
      console.log(repo.name);
      console.log(repo.html_url);
      console.log(repo.description);
      console.log('\n');
    });
  }
  ));

program
  .command('stars <username>')
  .description(`A list of the user's starred repos`)
  .action( username => githuh.stars(username, stars => {
    stars.forEach( star => {
      console.log(star.name);
      console.log(star.html_url);
      console.log(star.description);
      console.log('\n');
    });
  }
  ));

program
  .command('profile <username>')
  .description(`User's profile information`)
  .action( username => githuh.profile(username, profile => {
    console.log(profile);
  }
  ));

program
  .parse(process.argv);

if(!program.args.length) program.help();


