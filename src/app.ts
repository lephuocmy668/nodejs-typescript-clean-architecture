import "reflect-metadata";
import { Container } from "typedi";
import { UserRepositoryImpl } from "./infrastructure/data_access_layer/postgres/implementations/user_repository";
import { Client as CassandraClient } from "cassandra-driver";
import { User } from "./domain/entities/user";
import { UserRepository } from "./domain/interfaces/repositories/user";
import { createKoaServer, useContainer } from "routing-controllers";
import { UserController } from "./delivery/http/controllers/UserController";
import { TYPES } from "./domain/constants/injection_type";

const cassandaraClient = new CassandraClient({
  contactPoints: ["h1", "h2"],
  keyspace: "ks1"
});

Container.set(TYPES.TypeInfrastructureCassandaraClient, cassandaraClient);
Container.set(
  TYPES.TypeRepositoryUserRepository,
  new UserRepositoryImpl(
    Container.get<CassandraClient>(TYPES.TypeInfrastructureCassandaraClient)
  )
);

useContainer(Container);

const koaApp = createKoaServer({
  controllers: [UserController]
});

koaApp.listen(process.env.APP_PORT || 3000);

console.log("Server is up and running at port 3000");
