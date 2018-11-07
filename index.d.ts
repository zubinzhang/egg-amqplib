import * as amqp from 'amqplib';

interface EggAmqpOptions {
  client?: {
    [x: string]: any;
    url?: string;
    connectOptions?: amqp.Options.Connect;
    socketOptions?: any;
  };
}

declare module 'egg' {
  // extend app
  interface Application {
    amqp: amqp.Connection;
    amqplib: amqp.Connection;
  }

  // extend your config
  interface EggAppConfig {
    amqplib: EggAmqpOptions;
  }
}
