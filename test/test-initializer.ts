import * as fs from "fs";
import { createConnection, useContainer } from "typeorm";
import { Container } from "typedi";
import { DatabaseOption } from "./database-option";

let dbPath: string = "./test/dwapitest.sqlite3";
let entities: string[] = ["./test/artifacts/*.ts"];

export let clearDb = async (dbpath?: string) => {
    if (dbpath) {
        dbPath = dbpath;
    }
    fs.unlink(dbPath, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("db deleted !");
        }
    );
};

useContainer(Container);
export let initDbConnection = async (dbpath?: string, models?: string[]) => {
    if (dbpath) {
        dbPath = dbpath;
    }
    if (models) {
        entities = models;
    }
    await createConnection(DatabaseOption(dbPath, entities));
};