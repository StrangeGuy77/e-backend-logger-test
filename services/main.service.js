'use strict';

const applicationsSchema = require('../database/schemas/applications.schema');
const logsSchema = require('../database/schemas/log.schema');

class MainService {
  async getAll() {
    const logs = await logsSchema.find().sort({ created_at: 'descending' }).exec();

    return {
      status: 200,
      data: logs,
    };
  }

  async create(body) {
    const application = await applicationsSchema.exists({ _id: body.application_id }).exec();

    if (!application) {
      return {
        status: 400,
        message: 'Application does not exists',
      };
    }

    await logsSchema.create(body);

    return {
      status: 201,
      message: 'Log was successfully saved',
    };
  }

  async info(id) {
    const log = await logsSchema.findById(id).exec();

    if (log) {
      return {
        status: 200,
        data: log,
      };
    } else {
      return {
        status: 204,
        message: 'Log was not found',
      };
    }
  }

  async update(id, body) {
    const errors = [];

    const log = await logsSchema.findById(id).exec();

    if (!log) {
      errors.push('Log does not exists');
    }

    if (body.application_id) {
      const application = await applicationsSchema.exists({ _id: body.application_id }).exec();

      if (!application) {
        errors.push('Application does not exists');
      }
    }

    if (errors.length) {
      return {
        status: 400,
        message: errors,
      };
    }

    await log.updateOne({ ...body, updated_at: Date.now() });

    return {
      status: 204,
      message: 'Log was successfully saved',
    };
  }

  async delete(id) {
    const log = await logsSchema.findById(id).exec();

    if (!log) {
      return {
        status: 400,
        message: 'Log does not exists',
      };
    }

    await logsSchema.deleteOne({ _id: id });

    return {
      status: 204,
      message: 'Log was successfully deleted',
    };
  }
}

module.exports = new MainService();
