import { User as UserDomainEntity } from "../../../../domain/entities/user";
import { User as UserDBEntity } from "../model/user";
import { DataMapper } from "../interfaces/data_mapper";

export class UserDataMapper implements DataMapper<UserDomainEntity, UserDBEntity> {

    public fromDBEntityToDomainEntity(row: UserDBEntity): UserDomainEntity {
        const user = <UserDomainEntity>{};
        user.id = row.id || "";
        user.name = row.name || "";
        user.description = row.description || "";
        user.email = row.email || "";
        user.organization_id = row.organization_id || "";
        return user;
    }

    public fromDomainEntityToDALEntity(
        userDomainEntity: UserDomainEntity
    ): UserDBEntity {
        let user = <UserDBEntity>{};
        user.id = userDomainEntity.id || "";
        user.name = userDomainEntity.name || "";
        user.description = userDomainEntity.description || "";
        user.email = userDomainEntity.email || "";
        user.organization_id = userDomainEntity.organization_id || "";
        return user;
    }
}
