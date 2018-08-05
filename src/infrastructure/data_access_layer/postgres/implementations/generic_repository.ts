import { injectable, unmanaged } from 'inversify';
import { GenericRepository } from '../../../../domain/interfaces/repositories/generic_repository';
import { DataMapper } from '../interfaces/data_mapper';
import { Repository as TypeOrmRepository } from 'typeorm';

@injectable()
export class GenericRepositoryImpl<TDomainEntity, TDBEntity>
  implements GenericRepository<TDomainEntity> {
  private readonly _repository: TypeOrmRepository<TDBEntity>;
  private readonly _dataMapper: DataMapper<TDomainEntity, TDBEntity>;

  public constructor(
    @unmanaged() repository: TypeOrmRepository<TDBEntity>,
    @unmanaged() dataMapper: DataMapper<TDomainEntity, TDBEntity>
  ) {
    this._repository = repository;
    this._dataMapper = dataMapper;
  }

  public async readAll() {
    const entities = await this._repository.find();
    return entities.map(e => this._dataMapper.fromDBEntityToDomainEntity(e));
  }

  public async readOneByID(id: string) {
    const entity = await this._repository.findOne(id);
    return this._dataMapper.fromDBEntityToDomainEntity(entity);
  }

  public async create(input: TDomainEntity) {
    return new Promise<TDomainEntity>((resolve, reject) => {
      resolve(input);
    });
  }

  public async update(input: TDomainEntity) {
    return new Promise<TDomainEntity>((resolve, reject) => {
      resolve(input);
    });
  }

  public async delete(id: string) {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  }
}
