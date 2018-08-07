import { injectable, unmanaged } from "inversify";
import { GenericRepository } from "../../../../domain/interfaces/repositories/generic_repository";
import { DataMapper } from "../interfaces/data_mapper";
import { Client } from "cassandra-driver";
import { Container, Service, Inject, Token } from "typedi";
import { TYPES } from "../../../../domain/constants/injection_type";

@Service("repository.generic_repository")
export class GenericRepositoryImpl<TDomainEntity, TDBEntity>
  implements GenericRepository<TDomainEntity> {
  private readonly _client: Client;
  private readonly _dataMapper: DataMapper<TDomainEntity, TDBEntity>;

  public constructor(
    @Inject(TYPES.TypeInfrastructureCassandaraClient) client: Client
    // @unmanaged() dataMapper: DataMapper<TDomainEntity, TDBEntity>
  ) {
    this._client = client;
    // this._dataMapper = dataMapper;
  }

  // public async readAll() {
  //   // const entities = await this._repository.find();
  //   // return entities.map(e => this._dataMapper.fromDBEntityToDomainEntity(e));

  // }

  public async readOneByID(id: string) {
    // const entity = await this._repository.findOne(id);
    // return this._dataMapper.fromDBEntityToDomainEntity(entity);
    return new Promise<TDomainEntity>((resolve, reject) => {
      resolve(null);
    });
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
