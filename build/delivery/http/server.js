"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const TopicController_1 = require("./controllers/TopicController");
/**
 * Setup routing-controllers to use typedi container.
 */
routing_controllers_1.useContainer(typedi_1.Container);
/**
 * We create a new koa server instance.
 * We could have also use useKoaServer here to attach controllers to an existing koa instance.
 */
const koaApp = routing_controllers_1.createKoaServer({
    /**
     * We can add options about how routing-controllers should configure itself.
     * Here we specify what controllers should be registered in our express server.
     */
    controllers: [TopicController_1.TopicController],
});
/**
 * Start the koa app.
 */
koaApp.listen(process.env.APP_PORT || 3000);
console.log('Server is up and running at port 3000');
//# sourceMappingURL=server.js.map