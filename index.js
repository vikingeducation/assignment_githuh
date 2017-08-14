#!/usr/bin/env node

// require cli package
var program = require('commander');

// require api request package
var request = require('request');

// require GitHub class
var GitHub = require('./lib/github_api');

// pull in GitHub User Agent for header
var {USER_AGENT} = require('./secrets');