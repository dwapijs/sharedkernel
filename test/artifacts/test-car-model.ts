import { Column, Entity, ManyToOne } from "typeorm";
import { EntityBase } from "../../src/core/model/entity-base";
import { TestCar } from "./test-car";

@Entity()
export class TestCarModel extends EntityBase {
    @Column()
    name: string;

    @ManyToOne(type => TestCar, c => c.models)
    testCar: TestCar;

    constructor(name: string, testCar: TestCar) {
        super();
        this.name = name;
        this.testCar = testCar;
    }

    toString(): string {
        return `${this.testCar}, ${this.name}`;
    }
}