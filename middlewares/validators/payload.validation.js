'use strict';

const mainDtos = require('../../dtos/main.dto');

class PayloadValidationMiddleware {
  create(req, res, next) {
    const result = mainDtos.create.validate(req.body);

    if (result.error) {
      return res.status(400).json({
        message: result.error.message,
      });
    }

    next();
  }

  info(req, res, next) {
    const result = mainDtos.info.validate(req.params.id);

    if (result.error) {
      return res.status(400).json({
        message: result.error.message,
      });
    }

    next();
  }

  update(req, res, next) {
    const result = mainDtos.update.validate({
      id: req.params.id,
      ...req.body,
    });

    if (result.error) {
      return res.status(400).json({
        message: result.error.message,
      });
    }

    next();
  }

  delete(req, res, next) {
    const result = mainDtos.delete.validate(req.params.id);

    if (result.error) {
      return res.status(400).json({
        message: result.error.message,
      });
    }

    next();
  }
}

module.exports = new PayloadValidationMiddleware();
