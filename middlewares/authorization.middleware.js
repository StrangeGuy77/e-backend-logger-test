'use strict';

const jwt = require('jsonwebtoken');

class AuthorizationMiddleware {
  authorize(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const isValidToken = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    if (!isValidToken) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    next();
  }
}

module.exports = new AuthorizationMiddleware();
