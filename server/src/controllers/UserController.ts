import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { createUserToken } from "../helpers/createUserToken";
import { getToken } from "../helpers/getToken";

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

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Os campos de e-mail e senha são obrigatórios.",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Não há um usuário cadastrado com este e-mail.",
    });
  }

  // Check if passowrd match with database password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Senha incorreta.",
    });
  }

  await createUserToken(user, req, res);
}

interface JwtPayload {
  id: string;
}

export async function checkUser(req: Request, res: Response) {
  let currentUser;
  if (req.headers.authorization) {
    const token = getToken(req);
    const decodedToken = (await jwt.verify(token, "secret")) as JwtPayload;

    currentUser = await User.findById<any>(decodedToken.id);
    currentUser.password = undefined;
  } else {
    currentUser = null;
  }

  return res.json({
    user: currentUser,
  });
}
