'use strict';

const mainService = require('../services/main.service');

class MainController {
  async getAll(_, res) {
    const response = await mainService.getAll();

    return res.status(response.status).json(response);
  }

  async create(req, res) {
    const response = await mainService.create(req.body);

    return res.status(response.status).json(response);
  }

  async info(req, res) {
    const response = await mainService.info(req.params.id);

    return res.status(response.status).json(response);
  }

  async update(req, res) {
    const response = await mainService.update(req.params.id, req.body);

    return res.status(response.status).json(response);
  }

  async delete(req, res) {
    const response = await mainService.delete(req.params.id);

    return res.status(response.status).json(response);
  }
}

module.exports = new MainController();
