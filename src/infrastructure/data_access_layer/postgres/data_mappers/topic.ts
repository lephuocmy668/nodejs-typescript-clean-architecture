import { Topic as TopicDomainEntity } from '../../../../domain/entities/topic';
import { Topic as TopicDBEntity } from '../entities/topic';
import { DataMapper } from '../interfaces/data_mapper';

export class TopicDataMapper
  implements DataMapper<TopicDomainEntity, TopicDBEntity> {
  public fromDBEntityToDomainEntity(
    topicDBEntity: TopicDBEntity
  ): TopicDomainEntity {
    const topic = <TopicDomainEntity>{};
    topic.id = topicDBEntity.id;
    topic.name = topicDBEntity.name;
    topic.description = topicDBEntity.description;
    return topic;
  }

  public fromDomainEntityToDALEntity(
    topicDomainEntity: TopicDomainEntity
  ): TopicDBEntity {
    const topic = new TopicDBEntity();
    topic.id = topicDomainEntity.id;
    topic.name = topicDomainEntity.name;
    topic.description = topicDomainEntity.description;
    return topic;
  }
}
