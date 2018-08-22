'use strict';

const assert = require('assert');

const amqp = require('amqplib');

/**
 * mount apqp on app
 * @param {Application} app app
 */
module.exports = app => {
  const config = app.config.amqplib;
  assert(
    config.url || config.connectOptions,
    "[egg-amqplib] url and connectOptions can't be empty at the same time on config",
  );

  const connectOptions = config.url || parseOptions(config.connectOptions);
  app.coreLogger.info(`[egg-amqplib] connection on ${JSON.stringify(connectOptions)}`);

  app.beforeStart(async () => {
    app.amqp = await amqp.connect(
      connectOptions,
      config.socketOptions,
    );
    app.coreLogger.info('[egg-amqplib] connection success');
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
