import * as amqp from 'amqplib';

declare module 'egg' {
  // extend app
  interface Application {
    amqp: amqp.Connection;
  }

  // extend your config
  interface EggAppConfig {
    amqplib: {
      [x: string]: any;
      url?: string;
      connectOptions?: amqp.Options.Connect;
      socketOptions?: any;
    };
  }
}
