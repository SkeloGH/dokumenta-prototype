var UsersController = Class('UsersController').inherits(BaseController)({
  beforeActions : [
    // before :
  ],

  prototype : {
    index : function(req, res, next) {
      res.status(501).send('Not Implemented');
    },

    new : function(req, res, next) {
      res.render('users/new.html');
    },

    create : function(req, res, next) {
      var user = new User(req.body);

      res.format({
        json : function() {
          user.save()
            .then(res.json)
            .catch(res.json)
        }
      });

    },

    show : function(req, res, next) {

    },

    edit : function(req, res, next) {

    },

    update : function(req, res, next) {

    },

    destroy : function(req, res, next) {

    }
  }
})

module.exports = new UsersController();
