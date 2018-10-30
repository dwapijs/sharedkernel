export class DatabaseOption {
    logging: false;
    type: "sqlite";
    database: "test/dwapitest.sqlite3";
    entities: ["./src/core/model/*.ts"];
    synchronize: true;
}