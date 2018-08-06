import { User as UserDomainEntity } from "../../../../domain/entities/user";
import { User as UserDBEntity } from "../entities/user";
import { DataMapper } from "../interfaces/data_mapper";

export class UserDataMapper
  implements DataMapper<UserDomainEntity, UserDBEntity> {
  public fromDBEntityToDomainEntity(
    userDBEntity: UserDBEntity
  ): UserDomainEntity {
    const user = <UserDomainEntity>{};
    user.id = userDBEntity.id;
    user.name = userDBEntity.name;
    user.description = userDBEntity.description;
    return user;
  }

  public fromDomainEntityToDALEntity(
    userDomainEntity: UserDomainEntity
  ): UserDBEntity {
    const user = new UserDBEntity();
    user.id = userDomainEntity.id;
    user.name = userDomainEntity.name;
    user.description = userDomainEntity.description;
    return user;
  }
}
