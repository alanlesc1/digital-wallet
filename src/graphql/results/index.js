'use strict';
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const results = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-7) === 'Type.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    results[model.name] = model;
  });

const messages = require('./messages');
Object.assign(results, messages);

results.create = function create(resultType, args) {
  return new resultType(args);
};

module.exports = results;
