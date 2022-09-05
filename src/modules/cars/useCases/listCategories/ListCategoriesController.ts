import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response) {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    try {
      const all = await listCategoriesUseCase.execute();
      return response.json(all);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}

export { ListCategoriesController };
