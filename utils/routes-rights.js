const routesRights = {
  '/register': [],
  '/login': [],
  '/users': ['user', 'admin'],
  '/users/:id': ['user', 'admin'],
  '/users/update/:id': ['user', 'admin'],
  '/users/logout': ['user', 'admin'],
  '/users/delete/:id': ['user', 'admin'],
};

module.exports = routesRights;
