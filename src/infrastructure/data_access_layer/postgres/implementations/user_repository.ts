import { inject, injectable } from "inversify";
import { Repository as TypeOrmRepository } from "typeorm";
import { UserRepository } from "../../../../domain/interfaces/repositories/user";
import { User } from "../../../../domain/entities/user";
import { GenericRepositoryImpl } from "./generic_repository";
import { User as UserDBEntity } from "../entities/user";
import { UserDataMapper } from "../data_mappers/user";
import { Client } from "cassandra-driver";
import { Service, Inject } from "typedi";
import { TYPES } from "../../../../domain/constants/injection_type";

@Service(TYPES.TypeRepositoryUserRepository)
export class UserRepositoryImpl
  extends GenericRepositoryImpl<User, UserDBEntity>
  implements UserRepository {
  public constructor(
    @Inject(TYPES.TypeInfrastructureCassandaraClient) client: Client
  ) {
    super(client);
  }
  // Add custom methods here ...
}
