const routesRights = {
  '/register': [],
  '/login': [],
  '/users': ['user', 'admin'],
  '/users/:id': ['user', 'admin'],
  '/users/profile': ['user', 'admin'],
  '/users/update/:id': ['user', 'admin'],
  '/users/logout': ['user', 'admin'],
  '/users/delete/:id': ['user', 'admin'],
  '/users/deactivate/:id': ['user', 'admin'],
  '/meals': [],
  '/meals/:id': [],
  '/meals/add': ['user', 'admin'],
  '/meals/comment/:id': ['user', 'admin'],
  '/meals/update/:id': ['user', 'admin'],
  '/meals/delete/:id': ['admin'],
  '/comment/like/:id': ['user', 'admin'],
  '/comment/delete/:id': ['user', 'admin'],
  '/comment/like/delete/:id': ['user', 'admin'],
  '/photo/upload/:id': ['user', 'admin'],
};

module.exports = routesRights;
