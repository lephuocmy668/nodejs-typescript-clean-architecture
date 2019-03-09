import { injectable } from "inversify";
import { IGenericRepository } from "../../../../domain/interfaces/repositories/generic_repository";
import { DataMapper } from "../interfaces/data_mapper";
import { cassandraClient } from "../../../../domain/constants/decorators";


@injectable()
export class GenericRepositoryImpl<TDomainEntity> implements IGenericRepository<TDomainEntity> {

    protected readonly _client: any;
    private readonly _tableName: string;
    protected readonly _keyspace: string;
    private readonly _dataMapper: DataMapper<TDomainEntity, any>;

    public constructor(
        @cassandraClient client: any = null,
        tableName: string = null,
        keyspace: string = null,
        dataMapper: DataMapper<TDomainEntity, any>
    ) {
        this._client = client;
        this._tableName = tableName;
        this._keyspace = keyspace;
        this._dataMapper = dataMapper;
    }

    public async readAll() {
        return new Promise<TDomainEntity[]>((resolve, reject) => {
            const query = this._client(this._keyspace)
                .select("*")
                .from("users");

            query.exec((err: any, result: any) => {
                if (err) return reject(err);
                resolve(result.rows.map((item: any) => {
                    return this._dataMapper.fromDBEntityToDomainEntity(item);
                }));
            });
        });
    }

    public async readOneByID(id: string) {
        return new Promise<TDomainEntity>((resolve, reject) => {
            const query = this._client(this._keyspace)
                .select("*")
                .from(this._tableName);

            query.exec((err: any, result: any) => {
                if (err) return reject(err);
                resolve(result.rows.map((item: any) => {
                    return this._dataMapper.fromDBEntityToDomainEntity(item);
                }));
            });
        });
    }

    public async create(input: TDomainEntity) {
        return new Promise<TDomainEntity>((resolve, reject) => {
            const dbEntityInstance = this._dataMapper.fromDomainEntityToDALEntity(input);
            const query = this._client(this._keyspace)
                .insert(dbEntityInstance)
                .into(this._tableName);

            query.exec((err: any, result: any) => {
                if (err) return reject(err);
                resolve(input);
            });
        });
    }

    public async update(input: TDomainEntity) {
        return new Promise<TDomainEntity>((resolve, reject) => {
            const dbEntityInstance = this._dataMapper.fromDomainEntityToDALEntity(input);
            const query = this._client(this._keyspace).update(this._tableName);
            for (const key in dbEntityInstance) {
                if (key != "id" && dbEntityInstance[key]) {
                    query.set(key, dbEntityInstance[key]);
                }
            }
            query.where("id", "=", dbEntityInstance.id);
            query.exec(function (err: any, result: any) {
                if (err) return reject(err);
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
