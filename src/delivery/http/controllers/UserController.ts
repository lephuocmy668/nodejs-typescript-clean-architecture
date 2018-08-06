import {
  JsonController,
  Get,
  Post,
  Param,
  Delete,
  Body
} from "routing-controllers";
import { Service } from "typedi";
import { UserRepository } from "../../../domain/interfaces/repositories/user";
import { User } from "../../../domain/entities/user";
@Service()
@JsonController()
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post("/users")
  user(@Body() user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  @Get("/users/:id")
  one(@Param("id") id: number): Promise<User> {
    const userId = 1;
    return this.userRepository.readOneByID("ksk");
  }
}
