import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUserId(user_id);
    return rentals;
  }
}

export { ListRentalsByUserUseCase };
