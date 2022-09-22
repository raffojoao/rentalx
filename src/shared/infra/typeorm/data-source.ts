import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "rentx",
  synchronize: false,
  logging: false,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
});

export async function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export async function runQuery(query: string): Promise<void> {
  await AppDataSource.transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.query(query);
  });
}

export default AppDataSource;
