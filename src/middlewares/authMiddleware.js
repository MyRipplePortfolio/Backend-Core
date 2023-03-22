const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    // Extract JWT from Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Verify JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // Retrieve user with matching id and token
    const user = await UserModel.findOne({
      _id: decodedToken._id,
      'tokens.token': token
    });
    
    if (!user) {
      throw new Error();
    }
    
    // Attach user and token to request
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    res.status(401).send({error: 'Authentication failed'});
  }
};

module.exports = authMiddleware;