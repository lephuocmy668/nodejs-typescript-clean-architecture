import { IUserInteractor } from "../interfaces/user_cases/user_interactor";
import { User } from "../entities/user";
import { userRepository } from "../constants/decorators";
import { IUserRepository } from "../interfaces/repositories/user";
import { injectable } from "inversify";

@injectable()
export class UserInteractorImp implements IUserInteractor {
    @userRepository private _userRepository: IUserRepository;

    async findAll(): Promise<User[]> {
        return await this._userRepository.readAll();
    }

    async findById(id: string): Promise<User> {
        return;
    }

    async create(u: User): Promise<User> {
        return;
    };

    async delete(u: User): Promise<void> {

    }
}