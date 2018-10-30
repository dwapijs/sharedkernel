import { createConnection } from "typeorm";
import * as fs from "fs";
import { TestCarRepository } from "../artifacts/test-car-repository";
import { TestCar } from "../artifacts/test-car";
import { TestCarModel } from "../artifacts/test-car-model";

describe("Repository Base", () => {

    const dummyCars = TestCar.getTestCars(5);
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
        await repository.createBatch(dummyCars);
    });

    test("should create entity", async () => {
        const testCar = await repository.create(new TestCar("Mazda"));
        expect(testCar).not.toBeUndefined();
        console.log(`${testCar}`);
    });

    test("should create entity with children", async () => {
        const newCar = TestCar.createTestCarsWithModes(1, 2)[0];
        await repository.create(newCar);
        const testCar = await repository.get(newCar.id);
        expect(testCar).not.toBeUndefined();
        expect(testCar.models.length > 0);
        console.log(`${testCar}`);
        testCar.models.forEach((p) => console.log(`${p}`));
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

    test("should find  entity by id", async () => {
        const testCar = await repository.get(dummyCars[0].id);
        expect(testCar).not.toBeUndefined();
        console.log(`${testCar}`);
    });

    test("should delete  entity by id", async () => {
        const carId = dummyCars[4].id;
        await repository.remove(carId);
        const testCar = await repository.get(carId);
        expect(testCar).toBeUndefined();
    });

    afterAll(async () => {
        fs.unlink(dbPath, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log("db deleted !");
            }
        );
    });
});