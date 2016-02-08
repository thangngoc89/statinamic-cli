#!/usr/bin/env node

var program = require('commander');

program
  .version('1.0.0')
  .command('new <dir>', 'create new statinamic project')
  .parse(process.argv);
