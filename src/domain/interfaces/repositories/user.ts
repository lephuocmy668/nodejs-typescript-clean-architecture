import { IGenericRepository } from "./generic_repository";
import { User } from "../../entities/user";

export interface IUserRepository extends IGenericRepository<User> {

}
