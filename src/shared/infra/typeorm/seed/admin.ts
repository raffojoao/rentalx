import AppDataSource, { createConnection, runQuery } from "../data-source";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";

async function create() {
  const id = uuidv4();
  const password = await hash("admin", 8);

  //   const dataSource = AppDataSource("localhost");
  const connection = createConnection("localhost")
    .then(() => {
      console.log("Data Source initialized on admin.ts");
      runQuery(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com', '${password}', 'true', 'now()', '123321')`
      )
        .then(() => {
          "Successfully ran query";
        })
        .catch((err) => console.log("Error running query", err));
    })
    .catch((err) => {
      console.log("Failed to initialize Data Source on admin.ts", err);
    });
}

create().then(() => console.log("Created Admin User"));
