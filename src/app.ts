require("dotenv").load();
import "reflect-metadata";
import { Container } from "typedi";
import { UserRepositoryImpl } from "./infrastructure/data_access_layer/cassandra/implementations/user_repository";
import {
  Client as CassandraClient,
  auth as CassandraAuth
} from "cassandra-driver";
import { createKoaServer, useContainer } from "routing-controllers";
import { UserController } from "./delivery/http/controllers/UserController";
import { TYPES } from "./domain/constants/injection_type";

const cassandaraClient = new CassandraClient({
  contactPoints: [process.env.CASSANDRA_HOST],
  authProvider: new CassandraAuth.PlainTextAuthProvider(
    process.env.CASSANDRA_USER,
    process.env.CASSANDRA_PASSWORD
  ),
  keyspace: process.env.CASSANDRA_KEYSPACE
});

Container.set(TYPES.TypeInfrastructureCassandaraClient, cassandaraClient);
Container.set(TYPES.TypeInfrastructureUserKeyspace, "users");
Container.set(
  TYPES.TypeRepositoryUserRepository,
  new UserRepositoryImpl(
    Container.get<CassandraClient>(TYPES.TypeInfrastructureCassandaraClient),
    Container.get<string>(TYPES.TypeInfrastructureUserKeyspace)
  )
);

useContainer(Container);

const koaApp = createKoaServer({
  controllers: [UserController]
});

koaApp.listen(process.env.PORT || 3000);

console.log("Server is up and running at port %d", process.env.PORT);
