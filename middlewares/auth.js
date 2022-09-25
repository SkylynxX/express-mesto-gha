const jwt = require('jsonwebtoken');
const ErrorNotAuthorized = require('../errors/error-not-authorized');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  if (token) {
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new ErrorNotAuthorized());
    }
  }
  req.user = payload;
  return next();
};
