import * as fs from "fs";
import { Connection, createConnection, useContainer } from "typeorm";
import { Container } from "typedi";

export let clearDb = async () => {
    fs.unlink("test/dwapitest.sqlite3", (err) => {
            if (err) {
                console.log(err);
            }
            console.log("db deleted !");
        }
    );
};
