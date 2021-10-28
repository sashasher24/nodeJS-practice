const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    if(!token) {
      return response.status(401).json({message: "User not authorized"});
    }

    const decoded = jwt.verify(token, secret); // gets user id
    request.user = decoded; // = user id
    next();
  }
  catch (e) {
    response.status(401).json({message: "User not authorized"});
  }
}