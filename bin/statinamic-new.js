#!/usr/bin/env node
'use strict'

const program = require('commander')
const path = require('path')
const isEmptySync = require('../utils/isEmptySync')
const inquirer = require('inquirer')
const validUrl = require('valid-url')
let dir

program
  .arguments('<dir>')
  .action(function (arg) {
     dir = arg
  })
  .parse(process.argv)

if (typeof dir === 'undefined') {
   console.error('You must specify a dir')
   process.exit(1);
}

const dirPath = path.join(process.cwd(), dir)

if (!isEmptySync(dirPath)) {
  console.error('error: ' + dir + ' is not empty')
  process.exit(1)
}

/**
 * Ask for informations
 */
const questions = [
  {
   type: 'input',
   name: 'name',
   message: 'Name of your project',
   validate: function (value) {
     const pass = /^[a-zA-Z0-9\-]+$/.test(value)
     if (pass) {
       return true
     }
     return 'Project must contains only letters, numbers and dashes'
   }
  },
  {
   type: 'input',
   name: 'url',
   message: 'Homepage url for your website',
   validate: function (value) {
     if (validUrl.isUri(value)) {
       return true
     }
     return 'Please provide a valid url'
   }
  }
]

inquirer.prompt(questions, function (answers) {
  console.log(JSON.stringify(answers, null, "  "))
})
