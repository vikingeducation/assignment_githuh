#!/usr/bin/env node

//had some help from here, thanks learned a lot:
//https://developer.atlassian.com/blog/2015/11/scripting-with-node/
//comoman line interface tool
var program = require('commander');

//request lib
const request = require('request');

//my custom api wrapper module
const gitHuh = require('./apiWrapper.js');

//set up new gitHuh
const gitHuh2 = new gitHuh()

//cli params
program
  .arguments('[cmd] [username]')
//.option('-r, --repos <repos>', 'option to return a list of repos')
//.option('-s, --stars <stars>', 'option to return starred repositories')
//.option('-p, --profile <profile>', 'option to return users profile info')
  .action(function(cmd, username) {
    console.log('I am getting the %s info from %s', cmd, username )

    cmdType = cmd
    cmdusername = username

  })
  .parse(process.argv);
if (cmdType === "profile"){
gitHuh2.getUserProfileInfo(cmdusername, function(data) {
  console.log(data)
})
}

//
