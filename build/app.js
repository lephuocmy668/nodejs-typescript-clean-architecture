"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").load();
require("reflect-metadata");
const typedi_1 = require("typedi");
const user_repository_1 = require("./infrastructure/data_access_layer/cassandra/implementations/user_repository");
const cassandra_driver_1 = require("cassandra-driver");
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("./delivery/http/controllers/UserController");
const injection_type_1 = require("./domain/constants/injection_type");
var cassandaraClient = require("cassanknex")({
    connection: {
        contactPoints: [process.env.CASSANDRA_HOST],
        authProvider: new cassandra_driver_1.auth.PlainTextAuthProvider(process.env.CASSANDRA_USER || "", process.env.CASSANDRA_PASSWORD || "")
    },
    exec: {
        prepare: false
    }
});
cassandaraClient.on("ready", function (err) {
    typedi_1.Container.set(injection_type_1.TYPES.TypeInfrastructureCassandaraClient, cassandaraClient);
    typedi_1.Container.set(injection_type_1.TYPES.TypeInfrastructureUserKeyspace, process.env.CASSANDRA_KEYSPACE);
    typedi_1.Container.set(injection_type_1.TYPES.TypeRepositoryUserRepository, new user_repository_1.UserRepositoryImpl(typedi_1.Container.get(injection_type_1.TYPES.TypeInfrastructureCassandaraClient), typedi_1.Container.get(injection_type_1.TYPES.TypeInfrastructureUserKeyspace)));
    routing_controllers_1.useContainer(typedi_1.Container);
    const koaApp = routing_controllers_1.createKoaServer({
        controllers: [UserController_1.UserController]
    });
    koaApp.listen(process.env.PORT || 3000);
    console.log("Server is up and running at port %d", process.env.PORT);
});
//# sourceMappingURL=app.js.map