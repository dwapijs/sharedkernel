import { AggregateRoot } from "../model/aggregate-root";

export interface IRepositoryBase<T extends AggregateRoot> {
    create(entity: T): Promise<T>;

    createBatch(entity: T[]): Promise<T[]>;

    getAll(): Promise<T[]>;
}