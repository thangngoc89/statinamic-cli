'use strict'

const fs = require('fs')
/**
 * Check if a file or directory is empty synchronously
 *
 * @param {string} path
 */
module.exports = function isEmptySync (path) {
  let stat
  try {
    stat = fs.statSync(path);
  } catch (e) {
    return true;
  }
  if (stat.isDirectory()) {
    let items = fs.readdirSync(path);
    return !items || !items.length
  }
  let file = fs.readFileSync(path)
  return !file || !file.length
}
