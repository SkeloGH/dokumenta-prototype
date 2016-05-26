var RouteMappings = require('route-mappings');

var routeMappings = RouteMappings()
  .get('/', 'Home#index')
  .get('/register', { to : 'Users#new' })
  .resources('/Users', {
    except : 'new'
  })


module.exports = routeMappings;
