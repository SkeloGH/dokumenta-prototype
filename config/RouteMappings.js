var RouteMappings = require('route-mappings');

var routeMappings = RouteMappings()
  .get('/', 'Home#index')
  .get('/signup', { to : 'Users#new' })
  // .resources('/Users', {
  //   except : 'new'
  // }, function() {
  //   return RouteMappings()
  //     .resources('/Documents', {
  //       except : ['new', 'edit', 'show']
  //     })
  // })
  .resources('/Users', {
    except : 'new'
  })
  .resources('/Documents', {
    except : ['new', 'edit']
  })
  .get('/login', { to : 'Sessions#new' })
  .post('/login', { to : 'Sessions#create' })
  .post('/logout', { to : 'Sessions#destroy' })


module.exports = routeMappings;
