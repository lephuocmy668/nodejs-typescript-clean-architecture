import 'reflect-metadata';
import { createKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { TopicController } from './controllers/TopicController';

/**
 * Setup routing-controllers to use typedi container.
 */
useContainer(Container);

/**
 * We create a new koa server instance.
 * We could have also use useKoaServer here to attach controllers to an existing koa instance.
 */
const koaApp = createKoaServer({
  /**
   * We can add options about how routing-controllers should configure itself.
   * Here we specify what controllers should be registered in our express server.
   */
  controllers: [TopicController],
});

/**
 * Start the koa app.
 */
koaApp.listen(process.env.APP_PORT || 3000);

console.log('Server is up and running at port 3000');
