import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findById(id: string): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
  findByUserId(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
