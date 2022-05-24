import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const createUserToken = async (user: any, req: Request, res: Response) => {
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "secret"
  );

  res.status(200).json({
    message: "Usuário autenticado com sucesso.",
    token: token,
    userId: user._id,
  });
};
