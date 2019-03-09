import { User } from "../../entities/user";

export interface IUserInteractor {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    create(u: User): Promise<User>;
    delete(u: User): Promise<void>;
}