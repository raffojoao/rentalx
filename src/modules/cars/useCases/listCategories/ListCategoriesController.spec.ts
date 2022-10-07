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

describe("List Categories", () => {
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

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
