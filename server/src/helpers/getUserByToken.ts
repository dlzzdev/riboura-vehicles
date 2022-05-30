import jwt from "jsonwebtoken";
import User from "../models/User";
import { Response } from "express";

export const getUserByToken = async (token: string, res: Response) => {
  if (!token) {
    return res.status(401).json({
      message: "Não autorizado.",
    });
  }

  const decoded: any = jwt.verify(token, "secret");

  const user = await User.findById(decoded.id);

  return user;
};
