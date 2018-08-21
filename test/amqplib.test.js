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

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, amqplib')
      .expect(200);
  });
});
