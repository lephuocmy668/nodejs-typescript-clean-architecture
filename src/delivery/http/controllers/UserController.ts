import {
  JsonController,
  Get,
  Post,
  Param,
  Delete,
  Body
} from "routing-controllers";
import { Service, Inject } from "typedi";
import { UserRepository } from "../../../domain/interfaces/repositories/user";
import { User } from "../../../domain/entities/user";
import { TYPES } from "../../../domain/constants/injection_type";

@Service()
@JsonController()
export class UserController {
  private readonly _userRepository: UserRepository;

  constructor(
    @Inject(TYPES.TypeRepositoryUserRepository) userRepository: UserRepository
  ) {
    this._userRepository = userRepository;
  }

  @Post("/users")
  user(@Body() user: User): Promise<User> {
    user.name = "sllslssl";
    return this._userRepository.create(user);
  }

  @Get("/users/:id")
  one(@Param("id") id: number): Promise<User> {
    const userId = 1;
    return this._userRepository.readOneByID("ksk");
  }
}
