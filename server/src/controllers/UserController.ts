import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createUserToken } from "../helpers/createUserToken";

export async function register(req: Request, res: Response) {
  const { name, email, phone, password, confirmPassword } = req.body;

  // Validations
  if (!name || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios.",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "As senhas não coincidem.",
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      message: "Usuário já cadastrado.",
    });
  }

  // Create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const user = new User({
    name,
    email,
    phone,
    password: passwordHash,
  });

  try {
    const newUser = await user.save();
    await createUserToken(newUser, req, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Falha ao cadastrar usuário.",
    });
  }
}
