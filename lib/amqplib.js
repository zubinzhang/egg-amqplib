'use strict';

const assert = require('assert');

const amqp = require('amqplib');

module.exports = app => {
  const config = app.config.amqplib;
  assert(
    config.url || config.connectOptions,
    "[egg-amqplib] url and connectOptions can't be empty at the same time on config",
  );

  app.beforeStart(async () => {
    try {
      app.amqp = await amqp.connect(
        config.url || parseOptions(config.connectOptions),
        config.socketOptions,
      );
    } catch (err) {
      app.coreLogger.error(`[egg-amqplib] connection error: ${err.message}`);
    }
  });
};

/**
 * Parse amqplib connect options
 *
 * @param {*} connectOptions amqplib connect options
 * @return {*} amqplib connect options
 */
function parseOptions(connectOptions) {
  return Object.assign(
    {
      protocol: 'amqp',
      hostname: 'localhost',
      port: 5672,
      username: 'guest',
      password: 'guest',
      locale: 'en_US',
      frameMax: 0,
      heartbeat: 0,
      vhost: '/',
    },
    connectOptions,
  );
}
