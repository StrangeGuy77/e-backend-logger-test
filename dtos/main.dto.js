const Joi = require('joi');
const mongoose = require('mongoose');

const isObjectId = (value, helper) => {
  if (!mongoose.isValidObjectId(value)) {
    return helper.message('id is not a valid ObjectId');
  }

  return true;
};

const mainDtos = {
  create: Joi.object({
    application_id: Joi.string().custom(isObjectId).required(),
    type: Joi.string().valid('error', 'info', 'warning').required(),
    priority: Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest').required(),
    path: Joi.string().required(),
    message: Joi.string().required(),
    request: Joi.object({ data: Joi.any().required() }).required(),
    response: Joi.object({ data: Joi.any().required() }).required(),
  }).required(),

  info: Joi.string().custom(isObjectId).required(),

  update: Joi.object({
    id: Joi.string().custom(isObjectId).required(),
    application_id: Joi.string().custom(isObjectId).optional(),
    type: Joi.string().valid('error', 'info', 'warning').optional(),
    priority: Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest').optional(),
    path: Joi.string().optional(),
    message: Joi.string().optional(),
    request: Joi.object({ data: Joi.any().required() }).optional(),
    response: Joi.object({ data: Joi.any().required() }).optional(),
  }).required(),

  delete: Joi.string().custom(isObjectId).required(),
};

module.exports = mainDtos;
