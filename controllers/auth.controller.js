'use strict';

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { getTokenDto } = require('../dtos/authorization.dto');

const authorizationsSchema = require('../database/schemas/authorizations.schema');
const applicationsSchema = require('../database/schemas/applications.schema');
const logsSchema = require('../database/schemas/log.schema');

const generateToken = (applicationId) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  return jwt.sign({ application_id: applicationId }, secret, { expiresIn });
};

const validatePayload = (body) => {
  return getTokenDto.validate(body);
};

class AuthorizationController {
  async getToken(req, res) {
    try {
      const result = validatePayload(req.body);

      if (result.error) {
        return res.status(400).json({
          message: result.error.message,
        });
      }

      // Validate if application exists
      const applicationId = req.body.applicationId;
      const application = await applicationsSchema.exists({ _id: applicationId }).exec();

      if (!application) {
        return res.status(401).json({
          message: "The application doesn't exists",
        });
      }

      // Validate if app has already a token in database.
      const alreadyInDb = await authorizationsSchema.findOne({ application_id: applicationId }).exec();

      if (alreadyInDb) {
        try {
          // Validate token in db has not expired. The verify method throws when a token is expired.
          jwt.verify(alreadyInDb.token, process.env.JWT_SECRET);

          return res.status(200).json({
            message: 'Successfully authenticated',
            token: alreadyInDb.token,
          });
        } catch (error) {
          // Delete expired token
          authorizationsSchema.deleteOne({ application_id: applicationId }).exec();
        }
      }

      // If is not in Db already, then sign it up
      const token = generateToken(applicationId);

      authorizationsSchema.create({
        application_id: applicationId,
        token,
      });

      return res.status(200).json({
        message: 'Successfully authenticated',
        token,
      });
    } catch (error) {
      const errorId = new mongoose.Types.ObjectId();
      const message = `An error has occurred while trying to get a new token. Contact support with the following code: ${errorId}`;

      logsSchema.create({
        _id: errorId,
        application_id: req.body.applicationId,
        message: JSON.stringify(error),
        path: error.stack,
        priority: 'high',
        type: 'error',
        request: `POST /api/token`,
        response: message,
      });

      return res.status(500).json({
        message,
      });
    }
  }
}

module.exports = new AuthorizationController();
