import { inject, injectable } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';
import { TopicRepository } from '../../../../domain/interfaces/repositories/topic';
import { Topic } from '../../../../domain/entities/topic';
import { GenericRepositoryImpl } from './generic_repository';
import { Topic as TopicDBEntity } from '../entities/topic';
import { TopicDataMapper } from '../data_mappers/topic';
import { TYPES } from '../../../../domain/constants/injection_type';

@injectable()
export class TopicRepositoryImpl
  extends GenericRepositoryImpl<Topic, TopicDBEntity>
  implements TopicRepository {
  public constructor(
    @inject(TYPES.TypeOrmRepositoryOfTopicEntity)
    repository: TypeOrmRepository<TopicDBEntity>
  ) {
    super(repository, new TopicDataMapper());
  }
  // Add custom methods here ...
}
