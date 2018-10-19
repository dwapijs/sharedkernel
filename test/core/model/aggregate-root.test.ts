import { TestCar } from "../../artifacts/test-car";
import { TestCarModel } from "../../artifacts/test-car-model";

describe("Aggregate Root", () => {

    let car: TestCar;

    beforeAll(() => {
        car = new TestCar("Subaru");
        car.addModel(new TestCarModel("Forester", car));
        car.addModel(new TestCarModel("Impreza", car));
    });

    it("should have id", () => {
        expect(car.id).not.toBeUndefined();
        expect(car.models.length === 2);
        console.log(`${car}`);
        car.models.forEach(m => console.log(`  ${m}`));
    });
});