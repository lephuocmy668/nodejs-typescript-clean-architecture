import { inject, injectable } from "inversify";
import { Repository as TypeOrmRepository } from "typeorm";
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
  public constructor(
    @Inject(TYPES.TypeInfrastructureCassandaraClient) client: Client,
    @Inject(TYPES.TypeInfrastructureUserKeyspace) keyspace: string
  ) {
    const userDataMapper = new UserDataMapper();
    super(client, "account", keyspace, userDataMapper);
    this.table = "account";
  }

  public async create(input: User) {
    return new Promise<User>((resolve, reject) => {
      let queryString =
        ` INSERT INTO users.accounts (name, description, email) VALUES( '` +
        input.name +
        `' ,'` +
        input.description +
        `', '` +
        input.email +
        `' );`;
      this._client
        .execute(queryString)
        .then(data => {
          resolve(input);
        })
        .catch(ex => {
          reject(ex);
        });
    });
  }
}
