import { AggregateRoot } from "../../src/core/model/aggregate-root";
import { Column, Entity, OneToMany } from "typeorm";
import { TestCarModel } from "./test-car-model";
import * as faker from "faker";

@Entity()
export class TestCar extends AggregateRoot {
    @Column()
    name: string;
    @OneToMany(type => TestCarModel, m => m.testCar)
    models: TestCarModel[];

    constructor(name: string) {
        super();
        this.name = name;
    }

    addModel(model: TestCarModel) {
        model.testCar = this;
        if (!this.models) {
            this.models = [];
        }
        this.models.push(model);
    }

    static getTestCars(count: number = 2): Array<TestCar> {
        let i: number;
        const testCars: Array<TestCar> = [];
        for (i = 0; i < count; i++) {
            testCars.push(new TestCar(faker.commerce.productMaterial()));
        }
        return testCars;
    }

    static getTestCarsWithModle(count: number = 2, modelCount: number = 3): Array<TestCar> {
        let i: number;
        const testCars: Array<TestCar> = [];
        for (i = 0; i < count; i++) {
            testCars.push(new TestCar(faker.commerce.productMaterial()));
            for (i = 0; i < modelCount; i++) {
                TestCar.addModel(new TestCarModel(faker.commerce.productMaterial(), this));
            }
        }
        return testCars;
    }

    toString(): string {
        return `${this.name} (${this.id})`;
    }
}