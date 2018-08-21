# egg-amqplib

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-amqplib.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-amqplib
[travis-image]: https://img.shields.io/travis/zubincheung/egg-amqplib.svg?style=flat-square
[travis-url]: https://travis-ci.org/zubincheung/egg-amqplib
[codecov-image]: https://img.shields.io/codecov/c/github/zubincheung/egg-amqplib.svg?style=flat-square
[codecov-url]: https://codecov.io/github/zubincheung/egg-amqplib?branch=master
[david-image]: https://img.shields.io/david/zubincheung/egg-amqplib.svg?style=flat-square
[david-url]: https://david-dm.org/zubincheung/egg-amqplib
[snyk-image]: https://snyk.io/test/npm/egg-amqplib/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-amqplib
[download-image]: https://img.shields.io/npm/dm/egg-amqplib.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-amqplib

<!--
Description here.
-->

Amqp plugin for egg with amqplib

## Install

```bash
$ npm i egg-amqplib --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.amqplib = {
  enable: true,
  package: 'egg-amqplib',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.amqplib = {
  // url: 'amqp://localhost',
  connectOptions: {
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
  // socketOptions: {
  //   cert: certificateAsBuffer, // client cert
  //   key: privateKeyAsBuffer, // client key
  //   passphrase: 'MySecretPassword', // passphrase for key
  //   ca: [caCertAsBuffer], // array of trusted CA certs
  // },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

```js
const queueName = 'test';

// Publisher
const msg = 'test';
const ch = await this.app.amqp.createChannel();
await ch.assertQueue(queueName, { durable: false });
const ok = await ch.sendToQueue(queueName, Buffer.from(msg));

// Consumer
await ch.assertQueue(queueName, { durable: false });
const msg = await new Promise(resolve => ch.consume(queueName, msg => resolve(msg)));

if (msg !== null) {
  ch.ack(msg);
}

await ch.close();
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
