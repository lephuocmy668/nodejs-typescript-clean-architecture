"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedi_1 = require("typedi");
const user_repository_1 = require("./infrastructure/data_access_layer/postgres/implementations/user_repository");
const cassandra_driver_1 = require("cassandra-driver");
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("./delivery/http/controllers/UserController");
const injection_type_1 = require("./domain/constants/injection_type");
const cassandaraClient = new cassandra_driver_1.Client({
    contactPoints: ["h1", "h2"],
    keyspace: "ks1"
});
typedi_1.Container.set(injection_type_1.TYPES.TypeInfrastructureCassandaraClient, cassandaraClient);
typedi_1.Container.set(injection_type_1.TYPES.TypeRepositoryUserRepository, new user_repository_1.UserRepositoryImpl(typedi_1.Container.get(injection_type_1.TYPES.TypeInfrastructureCassandaraClient)));
routing_controllers_1.useContainer(typedi_1.Container);
const koaApp = routing_controllers_1.createKoaServer({
    controllers: [UserController_1.UserController]
});
koaApp.listen(process.env.APP_PORT || 3000);
console.log("Server is up and running at port 3000");
//# sourceMappingURL=app.js.map