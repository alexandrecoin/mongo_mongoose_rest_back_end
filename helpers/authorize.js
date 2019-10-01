require('dotenv').config();
const jwt = require('jsonwebtoken');
// const VerifyToken = require('../helpers/verify-token'); Copied in the below function, to be imported
const User = require('../models/User');
const routesRights = require('../utils/routes-rights');

function isAuthorized(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).json({ auth: false, message: 'No token provided' });

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
    if (err)
      res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });

    userId = decoded.id;
    const user = await User.findById(userId);
    if (!routesRights[req.route.path].includes(user.role))
      return (res.error = res.status(401).json({ message: 'Unauthorized' }));
    next();
  });
}

module.exports = isAuthorized;
