import { injectable, unmanaged } from "inversify";
import { GenericRepository } from "../../../../domain/interfaces/repositories/generic_repository";
import { DataMapper } from "../interfaces/data_mapper";
import { Client } from "cassandra-driver";
import { Service, Inject } from "typedi";
import { TYPES } from "../../../../domain/constants/injection_type";

@Service("repository.generic_repository")
export class GenericRepositoryImpl<TDomainEntity>
  implements GenericRepository<TDomainEntity> {
  private readonly _client: Client;
  private readonly _tableName: string;
  private readonly _keyspace: string;
  private readonly _dataMapper: DataMapper<TDomainEntity, any>;

  public constructor(
    @Inject(TYPES.TypeInfrastructureCassandaraClient) client: Client,
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
      const queryString =
        `select * from ` + this._keyspace + `.` + this._tableName + `s;`;
      this._client
        .execute(queryString)
        .then(resultSet => {
          const data = resultSet.rows.map(item => {
            return this._dataMapper.fromDBEntityToDomainEntity(item);
          });
          resolve(data);
        })
        .catch(ex => {
          reject(ex);
        });
    });
  }

  public async readOneByID(id: string) {
    return new Promise<TDomainEntity>((resolve, reject) => {
      resolve(null);
    });
  }

  public async create(input: TDomainEntity) {
    return new Promise<TDomainEntity>((resolve, reject) => {
      // accounts (name, description, email) VALUES('Le Phuoc My','My is young software engineer', 'lephuocmy668');
      let queryString = ` INSERT INTO ` + this._keyspace + ` `;

      this._client
        .execute(queryString)
        .then(data => {
          resolve(input);
        })
        .catch(ex => {
          reject(ex);
        });
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
