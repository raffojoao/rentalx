import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

beforeEach(() => {
  carsRepositoryInMemory = new CarsRepositoryInMemory();
  listAvailableCarsUseCase = new ListAvailableCarsUseCase(
    carsRepositoryInMemory
  );
});

describe("List Cars", () => {
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Gol de Teste",
      description: "Melhor carro do mundo",
      daily_rate: 100,
      license_plate: "GOL-1234",
      fine_amount: 100,
      brand: "Volkswagen",
      category_id: "1ec9550a-006c-40a7-82c4-78702e8e56ab",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Gol de Teste",
      description: "Melhor carro do mundo",
      daily_rate: 100,
      license_plate: "GOL-1234",
      fine_amount: 100,
      brand: "Volkswagen",
      category_id: "1ec9550a-006c-40a7-82c4-78702e8e56ab",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Volkswagen",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Gol de Teste",
      description: "Melhor carro do mundo",
      daily_rate: 100,
      license_plate: "GOL-1234",
      fine_amount: 100,
      brand: "Volkswagen",
      category_id: "1ec9550a-006c-40a7-82c4-78702e8e56ab",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Gol de Teste",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Gol de Teste",
      description: "Melhor carro do mundo",
      daily_rate: 100,
      license_plate: "GOL-1234",
      fine_amount: 100,
      brand: "Volkswagen",
      category_id: "1ec9550a-006c-40a7-82c4-78702e8e56ab",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "1ec9550a-006c-40a7-82c4-78702e8e56ab",
    });

    expect(cars).toEqual([car]);
  });
});
