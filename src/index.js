#!/usr/bin/env node

var storage = require('./storage'),
    actions = require('./actions'),
    cmd = process.argv[2] || 'list';

storage.getItem('master').then(actions.resolve.bind(actions, cmd), actions.init);