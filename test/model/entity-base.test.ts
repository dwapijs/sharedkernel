import { EntityBase } from "../../src/model/entity-base";

class TestCar extends EntityBase {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    toString(): string {
        return `${this.name} (${this.id})`
    }
}

describe("Entity Base", () => {

    let car: TestCar;

    beforeAll(() => {
        car = new TestCar("Subaru");
    });

    it("should have id", () => {
        expect(car.id).not.toBeUndefined();
        console.log(`${car}`);
    });
});