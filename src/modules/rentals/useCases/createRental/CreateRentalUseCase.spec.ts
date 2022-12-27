import dayjs from "dayjs";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayJsDateProvider: DayJsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Test car",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another rental for the same user", async () => {
    const car = await rentalsRepositoryInMemory.create({
      car_id: "212121",
      expected_return_date: dayAdd24Hours,
      user_id: "123456",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123456",
        car_id: "321456",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("User already has an rental in progress"));
  });

  it("should not be able to create a new rental if there is another rental for the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "313131",
      expected_return_date: dayAdd24Hours,
      user_id: "123456",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "313131",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car already rented"));
  });

  it("should not be able to create a new rental with less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "321",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Rental period must be at least 24 hours"));
  });
});
