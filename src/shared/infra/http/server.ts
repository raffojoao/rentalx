import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "../../container";
import swaggerFile from "../../../swagger.json";
import { createConnection } from "../typeorm/data-source";
import { router } from "./routes";
import { AppError } from "../../errors/AppError";

createConnection()
  .then(() => {
    console.log("Data Source has been initialized\n");
  })
  .catch((e) => {
    console.log("Error initializing Data Source", e);
  });
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is running in port 3333"));
