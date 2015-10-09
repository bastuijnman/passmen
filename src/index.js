#!/usr/bin/env node

var prompt = require('prompt'),
    storage = require('./storage'),
    actions = require('./actions');

/*
 * Setup for prompt
 */
prompt.message = 'Please enter';

storage.getItem('master').then(actions.resolve, actions.init);