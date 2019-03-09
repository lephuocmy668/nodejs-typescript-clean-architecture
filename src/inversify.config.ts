import { ContainerModule } from "inversify";
import { TYPES } from "./domain/constants/injection_type";

// repository
import { IUserRepository } from "./domain/interfaces/repositories/user";
import { UserRepositoryImp } from "./infrastructure/data_access_layer/cassandra/implementations/user_repository";

// business logic
import { UserInteractorImp } from "./domain/use_cases/user_interactor_imp";
import { IUserInteractor } from "./domain/interfaces/user_cases/user_interactor";

// controller
import { registerController } from "./infrastructure/ioc/utils";
import { UserController } from "./delivery/http/controllers/user_controller";

export const referenceDataIoCModule = new ContainerModule((bind) => {
    // registerController(bind, UserController);

    bind<IUserRepository>(TYPES.TypeRepositoryUserRepository)
        .to(UserRepositoryImp).inSingletonScope();

    bind<IUserInteractor>(TYPES.TypeUserInteractor)
        .to(UserInteractorImp).inSingletonScope();
})