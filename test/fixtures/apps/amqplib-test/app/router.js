'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/publish', controller.home.publish);
  router.get('/consume', controller.home.consume);
};
