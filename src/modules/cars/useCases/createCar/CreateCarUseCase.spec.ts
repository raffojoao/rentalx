import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "CAR1234",
      fine_amount: 50,
      brand: "Car Brand",
      category_id: "Car Category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with the same license plate", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      description: "Car description",
      daily_rate: 100,
      license_plate: "CAR1234",
      fine_amount: 50,
      brand: "Car Brand",
      category_id: "Car Category",
    });
    await expect(
      createCarUseCase.execute({
        name: "Car 2",
        description: "Car description",
        daily_rate: 100,
        license_plate: "CAR1234",
        fine_amount: 50,
        brand: "Car Brand",
        category_id: "Car Category",
      })
    ).rejects.toEqual(new AppError(""));
  });

  it("should create a car with available prop set to true", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 2",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 50,
      brand: "Car Brand",
      category_id: "Car Category",
    });
    expect(car.available).toBe(true);
  });
});
