'use strict';

const jwt = require('jsonwebtoken');

class AuthorizationMiddleware {
  authorize(req, res, next) {
    try {
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
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          message: 'Token expired',
        });
      }

      return res.status(500).json({
        message: 'Internal server exception',
      });
    }
  }
}

module.exports = new AuthorizationMiddleware();
