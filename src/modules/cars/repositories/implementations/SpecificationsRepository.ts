import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";
import { Repository } from "typeorm";
import AppDataSource from "../../../../database/data-source";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ description, name });
    await this.repository.save(specification);

    // const specification = new Specification();
    // Object.assign(specification, {
    //   name,
    //   description,
    //   created_at: new Date(),
    // });
    // this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: { name: name },
    });
    return specification;
    // const specification = this.specifications.find(
    //   (specification) => specification.name === name
    // );
    // return specification;
  }
}

export { SpecificationsRepository };
