import { UserRepository } from "../../../../domain/interfaces/repositories/user";
import { User } from "../../../../domain/entities/user";
import { GenericRepositoryImpl } from "./generic_repository";
import { UserDataMapper } from "../data_mappers/user";
import { Client } from "cassandra-driver";
import { Service, Inject } from "typedi";
import { TYPES } from "../../../../domain/constants/injection_type";

@Service(TYPES.TypeRepositoryUserRepository)
export class UserRepositoryImpl extends GenericRepositoryImpl<User>
  implements UserRepository {
  private readonly table: string;
  private userDataMapper: UserDataMapper;
  public constructor(
    @Inject(TYPES.TypeInfrastructureCassandaraClient) client: any,
    @Inject(TYPES.TypeInfrastructureUserKeyspace) keyspace: string
  ) {
    const userDataMapper = new UserDataMapper();
    super(client, "users", keyspace, userDataMapper);
    this.table = "users";
    this.userDataMapper = userDataMapper;
  }
}
