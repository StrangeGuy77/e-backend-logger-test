'use strict';

const router = require('express').Router();
const prefix = '/logs';

const authController = require('../controllers/auth.controller');
const mainController = require('../controllers/main.controller');
const authMiddleware = require('../middlewares/authorization.middleware');
const payloadValidation = require('../middlewares/validators/payload.validation');

router.post('/auth', authController.getToken);

router.use(`${prefix}*`, authMiddleware.authorize);

router.get(`${prefix}/`, mainController.getAll);
router.post(`${prefix}/`, payloadValidation.create, mainController.create);
router.get(`${prefix}/:id`, payloadValidation.info, mainController.info);
router.put(`${prefix}/:id`, payloadValidation.update, mainController.update);
router.delete(`${prefix}/:id`, payloadValidation.delete, mainController.delete);

module.exports = router;
