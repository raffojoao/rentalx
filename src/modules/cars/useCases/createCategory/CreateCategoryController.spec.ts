import { app } from "@shared/infra/http/app";
import {
  createConnection,
  runQuery,
  dropDatabase,
  close,
  runMigrations,
} from "@shared/infra/typeorm/data-source";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import { DataSource } from "typeorm";

describe("Create Category Controller", () => {
  beforeAll(async () => {
    const id = uuidv4();
    const password = await hash("admin", 8);
    await createConnection();
    await runMigrations();
    await runQuery(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com', '${password}', 'true', 'now()', '123321')`
    );
  });

  afterAll(async () => {
    await dropDatabase();
    await close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: "Category Supertest",
        description: "Category Syupertest",
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create two categories with the same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      });

    const response = await request(app)
      .post("/categories")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: "Category Supertest",
        description: "Another Category Supertest",
      });

    expect(response.status).toBe(500);
  });
});
