import {
  JsonController,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body
} from "routing-controllers";
import { Service, Inject } from "typedi";
import { UserRepository } from "../../../domain/interfaces/repositories/user";
import { User } from "../../../domain/entities/user";
import { TYPES } from "../../../domain/constants/injection_type";
import { uuid as UUID } from "@typed/uuid";

@Service()
@JsonController()
export class UserController {
  private readonly _userRepository: UserRepository;

  constructor( @Inject(TYPES.TypeRepositoryUserRepository) userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  @Get("/users")
  all(): Promise<User[]> {
    return this._userRepository.readAll();
  }

  @Post("/users")
  user(@Body() user: User): Promise<User> {
    return this._userRepository.create(user);
  }

  @Put("/users/:id")
  update(@Param("id") id: string, @Body() user: User): Promise<User> {
    user.id = id;
    return this._userRepository.update(user);
  }

  @Get("/users/:id")
  one(@Param("id") id: string): Promise<User> {
    return this._userRepository.readOneByID(id);
  }
}
