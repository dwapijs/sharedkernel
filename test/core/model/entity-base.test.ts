import { TestCar } from "../../artifacts/test-car";
import { TestCarModel } from "../../artifacts/test-car-model";

describe("Entity Base", () => {

    let carModel: TestCarModel;

    beforeAll(() => {
        const car = new TestCar("BMW");
        car.addModel(new TestCarModel("X5", car));
        carModel = car.models[0];
    });

    it("should have id", () => {
        expect(carModel.id).not.toBeUndefined();
        console.log(`${carModel}`);
    });
});