import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export const verifyId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(422).json({
      message: "Ocorreu um erro ao processar sua requisição, tente novamente.",
    });
  }
  next();
};
