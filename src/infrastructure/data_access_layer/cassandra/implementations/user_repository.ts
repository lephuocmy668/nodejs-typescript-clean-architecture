import { IUserRepository } from "../../../../domain/interfaces/repositories/user";
import { User } from "../../../../domain/entities/user";
import { GenericRepositoryImpl } from "./generic_repository";
import { UserDataMapper } from "../data_mappers/user";
import { injectable } from "inversify";
import { cassandraClient, userKeySpace } from "../../../../domain/constants/decorators";

export type UserKeySpace = string;

@injectable()
export class UserRepositoryImp extends GenericRepositoryImpl<User> implements IUserRepository {

    private readonly table: string;
    private userDataMapper: UserDataMapper;

    public constructor(
        @cassandraClient client: any,
        userKeySpace: string = "tiktok",
        tableName: string = "users",
        userDataMapper: UserDataMapper = new UserDataMapper()
    ) {
        super(client, tableName, userKeySpace, userDataMapper);
        this.table = "users";
        this.userDataMapper = userDataMapper;
    }
}