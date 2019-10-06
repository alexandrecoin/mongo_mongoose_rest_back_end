const routesRights = {
  '/register': [],
  '/login': [],
  '/users': ['user', 'admin'],
  '/users/:id': ['user', 'admin'],
  '/users/profile': ['user', 'admin'],
  '/users/update/:id': ['user', 'admin'],
  '/users/logout': ['user', 'admin'],
  '/users/delete/:id': ['user', 'admin'],
  '/meals': [],
  '/meals/:id': [],
  '/meals/add': ['user', 'admin'],
  '/meals/update/:id': ['user', 'admin'],
  '/meals/delete/:id': ['admin'],
};

module.exports = routesRights;
