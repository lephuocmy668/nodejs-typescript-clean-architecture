import {
  JsonController,
  Get,
  Post,
  Param,
  Delete,
  Body,
} from 'routing-controllers';
import { Service } from 'typedi';
import { TopicRepository } from '../../../domain/repositories/TopicRepository';
import { Topic } from '../../../domain/Types/Topic';

@Service()
@JsonController()
export class TopicController {
  constructor(private topicRepository: TopicRepository) {}

  @Post('/topics')
  topic(@Body() topic: Topic): Promise<Topic> {
    return this.topicRepository.create(topic);
  }

  @Get('/topics/:id')
  one(@Param('id') id: number): Promise<Topic> {
    return this.topicRepository.findByID(id);
  }
}
