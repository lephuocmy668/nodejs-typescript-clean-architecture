export interface GenericRepository<T> {
  create(record: T): Promise<T>;
  readAll(): Promise<T[]>;
  readOneByID(id: string): Promise<T>;
  update(record: T): Promise<T>;
  delete(id: string): Promise<Boolean>;
}
