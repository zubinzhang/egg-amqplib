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

基于 amqplib 的 egg amqp 插件

## 依赖说明

### 依赖的 egg 版本

| egg-amqplib 版本 | egg 1.x |
| ---------------- | ------- |
| 1.x              | 😁      |
| 0.x              | ❌      |

### 依赖的插件

<!--

如果有依赖其它插件，请在这里特别说明。如

- security
- multipart

-->

## 开启插件

```js
// config/plugin.js
exports.amqplib = {
  enable: true,
  package: 'egg-amqplib',
};
```

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 示例

```js
const queueName = 'test';

// Publisher
const msg = 'test';
const ch = await this.app.amqplib.createChannel();
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

## 提问交流

请到 [egg issues](https://github.com/zubincheung/egg-amqplib/issues) 移步交流。

## License

[MIT](LICENSE)
