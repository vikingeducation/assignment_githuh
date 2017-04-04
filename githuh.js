#!/usr/bin/env node

var program = require('commander');

program
       .version('1.0.0.0')
       .command ('repos <username>', 'list all repos for username')
       .command ('stars <username>', 'list all starred repos')
       .command ('profile <username>', 'show profile for username')
       .parse(process.argv);
