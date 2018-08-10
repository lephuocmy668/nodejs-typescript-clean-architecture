import { injectable, unmanaged } from "inversify";
import { GenericRepository } from "../../../../domain/interfaces/repositories/generic_repository";
import { DataMapper } from "../interfaces/data_mapper";
import { Client } from "cassandra-driver";
import { Service, Inject } from "typedi";
import { TYPES } from "../../../../domain/constants/injection_type";

@Service("repository.generic_repository")
export class GenericRepositoryImpl<TDomainEntity>
  implements GenericRepository<TDomainEntity> {
  protected readonly _client: any;
  private readonly _tableName: string;
  protected readonly _keyspace: string;
  private readonly _dataMapper: DataMapper<TDomainEntity, any>;

  public constructor(
    @Inject(TYPES.TypeInfrastructureCassandaraClient) client: any,
    tableName: string,
    keyspace: string,
    dataMapper: DataMapper<TDomainEntity, any>
  ) {
    this._client = client;
    this._tableName = tableName;
    this._keyspace = keyspace;
    this._dataMapper = dataMapper;
  }

  public async readAll() {
    return new Promise<TDomainEntity[]>((resolve, reject) => {
      let query = this._client(this._keyspace)
        .select("*")
        .from("users");

      query.exec((err: any, result: any) => {
        console.log(result, err);
        if (err) return reject(err);

        const data = result.rows.map((item: any) => {
          return this._dataMapper.fromDBEntityToDomainEntity(item);
        });
        resolve(data);
      });
    });
  }

  public async readOneByID(id: string) {
    return new Promise<TDomainEntity>((resolve, reject) => {
      let query = this._client(this._keyspace)
        .select("*")
        .from(this._tableName);
      query.exec((err: any, result: any) => {
        if (err) {
          return reject(err);
        }
        const data = result.rows.map((item: any) => {
          return this._dataMapper.fromDBEntityToDomainEntity(item);
        });
        resolve(data);
      });
    });
  }

  public async create(input: TDomainEntity) {
    return new Promise<TDomainEntity>((resolve, reject) => {
      const dbEntityInstance = this._dataMapper.fromDomainEntityToDALEntity(
        input
      );
      let query = this._client(this._keyspace)
        .insert(dbEntityInstance)
        .into(this._tableName);

      query.exec((err: any, result: any) => {
        if (err) {
          return reject(err);
        }
        resolve(input);
      });
    });
  }

  public async update(input: TDomainEntity) {
    return new Promise<TDomainEntity>((resolve, reject) => {
      const dbEntityInstance = this._dataMapper.fromDomainEntityToDALEntity(
        input
      );
      let query = this._client(this._keyspace).update(this._tableName);
      for (const key in dbEntityInstance) {
        if (key != "id" && dbEntityInstance[key]) {
          query = query.set(key, dbEntityInstance[key]);
        }
      }
      query = query.where("id", "=", dbEntityInstance.id);
      query.exec(function(err: any, result: any) {
        if (err) {
          return reject(err);
        }
        resolve(<TDomainEntity>result);
      });
    });
  }

  public async delete(id: string) {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  }
}
