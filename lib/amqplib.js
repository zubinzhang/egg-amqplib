'use strict';

const assert = require('assert');

const amqp = require('amqplib');
const Promise = require('bluebird');

/**
 * mount apqp on app
 * @param {Application} app app
 */
module.exports = app => {
  app.addSingleton('amqplib', createClient);
};

async function createClient(config, app) {
  assert(
    config.url || config.connectOptions,
    "[egg-amqplib] url and connectOptions can't be empty at the same time on config",
  );

  const connectOptions = config.url || parseOptions(config.connectOptions);
  app.coreLogger.info(`[egg-amqplib] connection on ${JSON.stringify(connectOptions)}`);

  if (!app.amqp) {
    app.amqp = await connect(
      connectOptions,
      config.socketOptions,
      app,
    );
  }
  app.coreLogger.info('[egg-amqplib] connection success');

  return app.amqp;
}

/**
 * get amqp connection
 *
 * @param {*} connectOptions connectOptions
 * @param {*} socketOptions socketOptions
 * @param {*} app egg context
 * @param {number} [retryCount=1] retry count
 */
async function connect(connectOptions, socketOptions, app, retryCount = 1) {
  if (retryCount > 10) process.exit(0);
  try {
    await Promise.delay(30000);

    app.coreLogger.info(`[egg-amqplib] Reconnecting count: ${retryCount}`);
    return amqp.connect(
      connectOptions,
      socketOptions,
    );
  } catch (error) {
    app.coreLogger.info(`[egg-amqplib] connect error: ${error.message}`);
    retryCount++;
    return connect(
      connectOptions,
      socketOptions,
      app,
      retryCount,
    );
  }
}

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
