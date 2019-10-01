require('dotenv').config();
const jwt = require('jsonwebtoken');

const VerifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).json({ auth: false, message: 'No token provided' });

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

module.exports = VerifyToken;
