var bcrypt = require('bcrypt-node');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var TokenStrategy = require('passport-token').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(req, id, done) {
  User.query()
    .where('id', id)
    // .include('info')
    .then(function (result) {
      done(null, result[0]);
    })
    .catch(done);
});

passport.use('local', new Strategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(request, email, password, done) {
  User.query().where({
    email : email
  }).then(function(result) {
    if (result.length === 0) {
      return done(new Error('User not found'));
    }

    if (result[0].token) {
      return done(new Error('User not activated'));
    }

    bcrypt.compare(password, result[0].encryptedPassword, function(err, valid) {
      if (err) {
        return done(err);
      }

      if (!valid) {
        return done(new Error('Wrong password'));
      }

      return done(null, result[0]);
    });
  });
}));

passport.use('token', new TokenStrategy({
  usernameQuery: 'email',
  tokenQuery: 'token'
}, function (username, token, done) {
    User.query().where({
      token : token
    }).then(function(result) {
      if (!result || result.length === [0]) {
        return done(new Error('Invalid token'));
      }

      return done(null, result[0]);
    }).catch(done);
  }
));

module.exports = passport;
