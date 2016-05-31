var env = process.env.NODE_ENV || 'development';
var path = require('path');

var config = {
  appName : 'dokumenta',
  environment : env,

  development : {
    port : process.env.PORT || 3000,
    sessions       : {
      key      : 'session',
      secret   : 'EDIT ME',
    },
    siteURL : 'http://localhost:3000',
    enableLithium : false,

    // mailer
    mailer: {
      sendEmails: true,
      mailgun: {
        auth: {
          api_key: 'mailgun key',
          domain: 'mailgun domain',
        },
      },
    }
  },

  production : {},
  test : {}
}

config.logFile = path.join(process.cwd(), '/log/' + env + '.log');

config.database        = require('./../knexfile.js');

config.middlewares     = require('./middlewares.js');

module.exports = config;
