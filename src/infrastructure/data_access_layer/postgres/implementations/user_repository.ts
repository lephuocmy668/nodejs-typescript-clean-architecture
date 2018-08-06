import { inject, injectable } from "inversify";
import { Repository as TypeOrmRepository } from "typeorm";
import { UserRepository } from "../../../../domain/interfaces/repositories/user";
import { User } from "../../../../domain/entities/user";
import { GenericRepositoryImpl } from "./generic_repository";
import { User as UserDBEntity } from "../entities/user";
import { UserDataMapper } from "../data_mappers/user";
import { TYPES } from "../../../../domain/constants/injection_type";

@injectable()
export class UserRepositoryImpl
  extends GenericRepositoryImpl<User, UserDBEntity>
  implements UserRepository {
  public constructor(
    @inject(TYPES.TypeOrmRepositoryOfUserEntity)
    repository: TypeOrmRepository<UserDBEntity>
  ) {
    super(repository, new UserDataMapper());
  }
  // Add custom methods here ...
}
