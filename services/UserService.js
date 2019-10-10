// Middleware function to be called for GET one, PATCH and DELETE requests
const User = require('../models/User');

getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.user = user;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

module.exports = { getUser };
