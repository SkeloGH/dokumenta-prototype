var RouteMappings = require('route-mappings');

var routeMappings = RouteMappings()
  .get('/', 'Home#index')
  .get('/signup', { to : 'Users#new' })
  .resources('/Users', {
    except : 'new'
  }, function() {
    return RouteMappings()
      .resources('/Documents', {
        as : 'Documents',
        except : ['new', 'edit', 'show']
      })
  })
  .get('/login', { to : 'Sessions#new' })
  .post('/login', { to : 'Sessions#create' })
  .post('/logout', { to : 'Sessions#destroy' })


module.exports = routeMappings;
