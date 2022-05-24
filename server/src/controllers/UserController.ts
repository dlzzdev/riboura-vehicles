import User from "../models/User";
import { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  res.json({ message: "Riboura Cars!" });
}
