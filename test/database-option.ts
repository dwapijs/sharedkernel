import { ConnectionOptions } from "typeorm";

export let DatabaseOption = (db: string, entities: string[]): ConnectionOptions => {
    return {
        logging: true,
        type: "sqlite",
        database: db,
        entities: entities,
        synchronize: true
    };
};