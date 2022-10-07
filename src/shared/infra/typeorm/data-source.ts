import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const connectionOptions: DataSourceOptions = {
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
};

const AppDataSource = new DataSource(connectionOptions);

export async function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({
    host: process.env.NODE_ENV === "test" ? "localhost" : host,
    database:
      process.env.NODE_ENV === "test"
        ? "rentx_test"
        : AppDataSource.options.database.toString(),
  }).initialize();
}

export async function runQuery(query: string): Promise<void> {
  await AppDataSource.transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.query(query);
  });
}

export async function runMigrations() {
  await AppDataSource.runMigrations();
}

export async function dropDatabase() {
  await AppDataSource.dropDatabase();
}

export async function close() {
  await AppDataSource.destroy();
}

export default AppDataSource;
