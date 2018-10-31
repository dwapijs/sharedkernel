import * as fs from "fs";
import { createConnection, useContainer } from "typeorm";
import { Container } from "typedi";
import { DatabaseOption } from "./database-option";

const dbPath: string = "./test/dwapitest.sqlite3";
const entities: string[] = ["./test/artifacts/*.ts"];

export let clearDb = async () => {
    fs.unlink(dbPath, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("db deleted !");
        }
    );
};

useContainer(Container);
export let initDbConnection = async () => {
    await createConnection(DatabaseOption(dbPath, entities));
};