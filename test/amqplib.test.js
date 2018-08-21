'use strict';

const mock = require('egg-mock');

describe('test/amqplib.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/amqplib-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should publish message', () => {
    return app
      .httpRequest()
      .get('/publish')
      .query({ msg: 'hello world' })
      .expect('true')
      .expect(200);
  });

  it('should consume message', () => {
    return app
      .httpRequest()
      .get('/consume')
      .expect({ msg: 'hello world' })
      .expect(200);
  });
});
