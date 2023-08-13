'use strict';

const router = require('express').Router();
const prefix = '/logs';

const authController = require('../controllers/auth.controller');
const mainController = require('../controllers/main.controller');
const authMiddleware = require('../middlewares/authorization.middleware');

router.post('/auth', authController.getToken);

router.use(`${prefix}*`, authMiddleware.authorize);

router.get(`${prefix}/`, mainController.all);
router.post(`${prefix}/`, mainController.create);
router.get(`${prefix}/:id`, mainController.info);
router.put(`${prefix}/:id`, mainController.update);
router.delete(`${prefix}/:id`, mainController.delete);

module.exports = router;
