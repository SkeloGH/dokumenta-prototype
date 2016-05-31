var UsersController = Class('UsersController').inherits(RestfulController)({
  beforeActions : [
    {
      before : function(req, res, next) {
        User.query().where('id', req.params.id)
          .then(function(result) {
            if (result.length === 0) {
              return next(new NotFoundError('User not found'));
            }

            res.locals.currentUser = result[0];

            if (req.user.id !== res.locals.currentUser.id) {
              req.flash('error', 'Not Authorized');
              return res.redirect(res.locals.routeMappings.root.url());
            }

            next();
          })
          .catch(next);
      },
      actions : ['show', 'edit', 'update', 'destroy']
    }
  ],

  prototype : {
    index : function(req, res, next) {
      res.status(501).send('Not Implemented');
    },

    new : function(req, res, next) {
      res.render('users/new.html', {layout : 'empty'});
    },

    create : function(req, res, next) {
      var user = new User(req.body);

      res.format({
        json : function() {
          user.activate().save()
            .then(function() {
              req.flash('success', 'User created!');
              res.json(user);
            })
            .catch(function(err) {
              res.status(401).json(err);
            });
        },
        html : function() {
          res.status(501).send('Not Implemented');
        }
      });

    },

    show : function(req, res, next) {
      res.render('users/show.html');
    },

    edit : function(req, res, next) {
      res.render('users/edit.html');
    },

    update : function(req, res, next) {
      var user = res.locals.currentUser;

      user.updateAttributes(req.body);

      user.save().then(function() {
        req.flash('success', 'User updated');
        res.redirect(res.locals.routeMappings.root.url());
      })
      .catch(function(err) {
        res.status(400).json(err);
      });
    },

    destroy : function(req, res, next) {
      return res.status(501).send('Not Implemented');

      var user = res.locals.currentUser;

      user.destroy().then(function() {
          req.flash('success');
          res.redirect(res.locals.routeMappings.root.url());
        })
        .catch(function(err) {
          res.status(400).json(err);
        });
    }
  }
})

module.exports = new UsersController();
