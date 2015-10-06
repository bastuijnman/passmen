#!/usr/bin/env node

var prompt = require('prompt'),
    storage = require('./storage'),
    actions = require('./actions');

prompt.message = 'Please enter';

storage.getItem('master').then(actions.resolve, actions.init);