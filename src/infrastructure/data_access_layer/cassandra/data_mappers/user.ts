import { User as UserDomainEntity } from "../../../../domain/entities/user";
import { DataMapper } from "../interfaces/data_mapper";

export class UserDataMapper implements DataMapper<UserDomainEntity, any> {
  public fromDBEntityToDomainEntity(row: any): UserDomainEntity {
    const user = <UserDomainEntity>{};
    user.id = row.id || "";
    user.name = row.name || "";
    user.description = row.description || "";
    user.email = row.email || "";
    return user;
  }

  public fromDomainEntityToDALEntity(userDomainEntity: UserDomainEntity): any {
    const user = {};
    return user;
  }
}
