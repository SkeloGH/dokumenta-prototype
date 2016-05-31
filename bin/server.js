#!/usr/bin/env node

var path = require('path');
var glob = require('glob');

var neonode = require(path.join(process.cwd(), '/lib/core'));

// Require Model relations
glob.sync("models-relations/*.js").forEach(function(file) {
  logger.info('Loading ' + file + ' relation ...')
  require(path.join(process.cwd(), '/' + file));
});

neonode._serverStart();

logger.info('Server started listening on http://localhost:' + CONFIG[CONFIG.environment].port);
