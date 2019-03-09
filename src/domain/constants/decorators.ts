import { inject } from "inversify";
import { TYPES } from "./injection_type";

export const cassandraClient = inject(TYPES.TypeInfrastructureCassandaraClient);
export const userRepository = inject(TYPES.TypeRepositoryUserRepository);
export const userKeySpace = inject(TYPES.TypeInfrastructureUserKeyspace);
export const userInteractor = inject(TYPES.TypeUserInteractor);

