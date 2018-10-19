import "reflect-metadata";
import { Connection } from "typeorm";
import { IRepositoryBase } from "../core/interfaces/irepository-base";
import { AggregateRoot } from "../core/model/aggregate-root";

export type ObjectType<T> = { new(): T } | Function;

export abstract class RepositoryBase<T extends AggregateRoot> implements IRepositoryBase<T> {
    private type: ObjectType<T>;
    connection: Connection;

    constructor(type: ObjectType<T>, connection: Connection) {
        this.type = type;
        this.connection = connection;
    }

    create(entity: T): Promise<T> {
        return this.connection.manager.save(entity);
    }

    createBatch(entities: T[]): Promise<T[]> {
        return this.connection.manager.save(entities);
    }

    getAll(): Promise<Array<T>> {
        return this.connection.manager.find(this.type);
    }

    get(id: string): Promise<T> {
        return this.connection.manager.findOne(this.type, id);
    }
}