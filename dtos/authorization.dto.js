const Joi = require('joi');
const mongoose = require('mongoose');

const isObjectId = (value, helper) => {
  if (!mongoose.isValidObjectId(value)) {
    return helper.message('applicationId is not a valid ObjectId');
  }

  return true;
};

const authorizationDtos = {
  getTokenDto: Joi.object({
    applicationId: Joi.string().custom(isObjectId),
  }),
};

module.exports = authorizationDtos;
