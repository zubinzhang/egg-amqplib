'use strict';

const Controller = require('egg').Controller;
const queueName = 'test';

class HomeController extends Controller {
  async publish() {
    const { msg } = this.ctx.query;

    const ch = await this.app.amqp.createChannel();
    await ch.assertQueue(queueName, { durable: false });
    const ok = await ch.sendToQueue(queueName, Buffer.from(msg));
    await ch.close();

    this.ctx.body = ok;
    this.ctx.status = 200;
  }

  async consume() {
    const ch = await this.app.amqp.createChannel();
    await ch.assertQueue(queueName, { durable: false });
    const msg = await new Promise(resolve => ch.consume(queueName, msg => resolve(msg)));

    if (msg !== null) {
      ch.ack(msg);
      await ch.close();

      this.ctx.status = 200;
      this.ctx.body = { msg: msg.content.toString() };
    } else {
      this.ctx.status = 500;
    }
  }
}

module.exports = HomeController;
