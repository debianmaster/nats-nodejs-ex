'use strict';

const nats = require('nats');
const argv = require('minimist')(process.argv.slice(2));

const url = argv.s || nats.DEFAULT_URI;
const creds = argv.creds;
const subject = argv._[0];
const msg = argv._[1] || '';

if (!subject) {
    console.log('Usage: node-pub  [-s server] [--creds file] <subject> [msg]');
    process.exit();
}

// Connect to NATS server.
const nc = nats.connect(url, nats.creds(creds));

nc.publish(subject, msg, function() {
    console.log('Published [' + subject + '] : "' + msg + '"');
    process.exit();
});

nc.on('error', function(e) {
    console.log('Error [' + nc.currentServer + ']: ' + e);
    process.exit();
});
