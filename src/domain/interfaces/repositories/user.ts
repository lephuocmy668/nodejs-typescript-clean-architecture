import { GenericRepository } from "./generic_repository";
import { User } from "../../entities/user";

export interface UserRepository extends GenericRepository<User> {}
