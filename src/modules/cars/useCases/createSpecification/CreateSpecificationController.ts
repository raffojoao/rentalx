import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response) {
    const createSpecificationsUseCase = container.resolve(
      CreateSpecificationUseCase
    );
    const { name, description } = request.body;
    try {
      await createSpecificationsUseCase.execute({ name, description });
      return response.status(201).send();
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}

export { CreateSpecificationController };
