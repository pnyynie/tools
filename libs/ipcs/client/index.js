const add = require('./add');
const modify = require('./modify');
const remove = require('./remove');
const query = require('./query');
const queryConfig = require('./queryConfig');
const modifyConfig = require('./modifyConfig');
const run = require('./run');
const versionsDetection = require('./versionsDetection');

module.exports = [add, modify, remove, query, queryConfig, modifyConfig, run, versionsDetection];
