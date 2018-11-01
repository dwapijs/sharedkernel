import * as fs from "fs";
import { createConnection, useContainer } from "typeorm";
import { Container } from "typedi";
import { DatabaseOption } from "./database-option";

export let clearDb = async (dbpath: string = "./test/dwapitest.sqlite3") => {
    fs.unlink(dbpath, () => {
    });
};

useContainer(Container);
export let initDbConnection = async (dbpath: string = "./test/dwapitest.sqlite3", models: string[] = ["./test/artifacts/*.ts"]) => {
    await createConnection(DatabaseOption(dbpath, models));
};