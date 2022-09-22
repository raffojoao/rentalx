import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  if (!id) {
    throw new AppError("Id não informado");
  }

  const usersRepository = new UsersRepository();
  const user = usersRepository.findById(id);

  if (!(await user).isAdmin) {
    throw new AppError("User is not admin");
  }

  return next();
}
