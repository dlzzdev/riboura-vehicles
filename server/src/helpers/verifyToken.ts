import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getToken } from "./getToken";

interface MyUserRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Não autorizado.",
    });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({
      message: "Não autorizado.",
    });
  }

  try {
    const verified = jwt.verify(token, "secret");
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Token inválido!",
    });
  }
};
