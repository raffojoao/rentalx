import { In, Repository } from "typeorm";
import AppDataSource from "@shared/infra/typeorm/data-source";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ description, name });
    await this.repository.save(specification);
    return specification;

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

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findBy({ id: In(ids) });
    return specifications;
  }
}

export { SpecificationsRepository };
