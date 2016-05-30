var path = require('path');
var passport = require(path.join(process.cwd(), 'lib', 'passport', 'LocalAndTokenStrategies.js'));

var SessionsController = Class('SessionsController').inherits(BaseController)({
  prototype : {
    new : function(req, res, next) {
      if (req.user) {
        req.flash('info', 'You are already logged in');
        return res.redirect(CONFIG.router.mappings.root.url());
      }

      if (!req.query.token) {
        return res.render('sessions/new.html', { layout : 'empty'});
      }

      passport.authenticate('token', function(err, user, info) {
        if (err) {
          req.flash('danger', err.message);

          return res.redirect(CONFIG.router.mappings.root.url());
        }

        if (!user) {
          req.flash('danger', 'Invalid token!');
          return res.redirect(CONFIG.router.mappings.root.url());
        }

        user.token = null;

        user.save().then(function() {
          req.login(user, function(err) {
            if (err) {
              logger.info('Error', err);
              return next(err);
            }

            req.flash('success', 'Logged in');
            return res.redirect(CONFIG.router.mappings.root.url());
          });
        }).catch(next);

      })(req, res, next);
    },

    create : function(req, res, next) {
      if (req.user) {
        req.flash('info', 'You are already logged in');
        return res.redirect(CONFIG.router.mappings.root.url());
      }

      passport.authenticate('local', function(err, user, info) {
        if (err) {
          req.flash('danger', err.message);
          return res.redirect(CONFIG.router.mappings.root.url());
        }

        req.login(user, function(err) {
          if (err) {
            logger.info('Error', err);
            return next(err);
          }

          req.flash('success', 'Logged in');
          return res.redirect(CONFIG.router.mappings.root.url());
        });
      })(req, res, next);
    },

    destroy : function(req, res, next) {
      req.logout();
      req.flash('success', 'Signed off');
      return res.redirect(CONFIG.router.mappings.root.url());
    }
  }
});

module.exports = new SessionsController();
