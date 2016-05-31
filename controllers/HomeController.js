var HomeController = Class('HomeController').inherits(BaseController)({
  prototype : {
    index : function(req, res, next) {
      if (req.user) {
        return res.redirect(CONFIG.router.mappings.Users.show.url(req.user.id));
      }

      res.redirect('/login');
    }
  }
});

module.exports = new HomeController();
