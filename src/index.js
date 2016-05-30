#!/usr/bin/env node

var storage = require('./storage'),
    actions = require('./actions'),
    cmd = process.argv[2] || 'help';

storage.getItem('master').then(actions.resolve.bind(actions, cmd), actions.init);