module.exports = function(req, res, next) {
  if (CONFIG[CONFIG.environment].sessions !== false) {
    res.locals.csrfToken = req.csrfToken();
  }

  res.locals.routeMappings = CONFIG.router.mappings;

  res.locals.isAuthenticated = req.isAuthenticated();

  next();
}
