import { createConnection } from "typeorm";
import * as fs from "fs";
import { TestCarRepository } from "../artifacts/test-car-repository";
import { TestCar } from "../artifacts/test-car";
import { TestCarModel } from "../artifacts/test-car-model";

describe("Repository Base", () => {

    const dbPath: string = "test/dwapitest.sqlite3";
    let repository: TestCarRepository;
    beforeAll(async () => {
        fs.unlink(dbPath, (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log("db deleted !");
            }
        );
        const connection = await createConnection({
            logging: true,
            type: "sqlite",
            database: dbPath,
            entities: ["test/artifacts/*.ts"],
            synchronize: true
        });
        repository = new TestCarRepository(TestCar, connection);
        await repository.createBatch(TestCar.getTestCars(5));
    });

    test("should create entity", async () => {
        const testCar = await repository.create(new TestCar("Mazda"));
        expect(testCar).not.toBeUndefined();
        console.log(`${testCar}`);
    });

    test("should create entity with children", async () => {

        addModel(new TestCarModel("Demi", testCar));
        const testCar = await repository.create(new TestCar("Mazda"));

        expect(testCar).not.toBeUndefined();
        console.log(`${testCar}`);
    });

    test("should create batch entities", async () => {
        const testCars = await repository.createBatch(TestCar.getTestCars(2));
        expect(testCars.length === 2);
        testCars.forEach((p) => console.log(`${p}`));
    });

    test("should read  entities", async () => {
        const testCars = await repository.getAll();
        expect(testCars.length > 0);
        testCars.forEach((p) => console.log(`${p}`));
    });
});