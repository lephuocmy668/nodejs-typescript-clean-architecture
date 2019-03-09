export interface DataMapper<DomainEntity, DBEntity> {
    fromDBEntityToDomainEntity(entity: DBEntity): DomainEntity;
    fromDomainEntityToDALEntity(domain: DomainEntity): DBEntity;
}
