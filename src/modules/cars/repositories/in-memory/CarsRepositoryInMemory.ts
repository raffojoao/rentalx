import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string) {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const all = this.cars.filter((car) => {
      if (car.available === true) {
        let carFiltered = {};
        if (brand) {
          carFiltered = car.brand === brand ? car : null;
        }
        if (category_id) {
          carFiltered = car.category_id === category_id ? car : null;
        }
        if (name) {
          carFiltered = car.name === name ? car : null;
        }
        return carFiltered;
      }
    });
    return all;
  }
}

export { CarsRepositoryInMemory };
