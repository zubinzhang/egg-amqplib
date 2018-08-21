'use strict';

const amqp = require('./lib/amqplib');

module.exports = app => {
  amqp(app);
};
