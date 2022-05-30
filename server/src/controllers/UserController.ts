import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { createUserToken } from "../helpers/createUserToken";
import { getToken } from "../helpers/getToken";
import mongoose from "mongoose";
import { getUserByToken } from "../helpers/getUserByToken";

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

    currentUser = await User.findById(decodedToken.id).select("-password");
  } else {
    currentUser = null;
  }

  return res.json({
    user: currentUser,
  });
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return false;

  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(422).json({
      message: "Usuário não encontrado.",
    });
  }

  return res.json({
    user,
  });
}

export async function editUser(req: Request, res: Response) {
  const { id } = req.params;

  const { name, email, phone, password, confirmPassword } = req.body;

  const token = getToken(req);
  const user = await getUserByToken(token, res);

  let image = "";

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios.",
    });
  }

  user.name = name;
  user.phone = phone;

  const userExists = await User.findOne({ email });

  if (user.email !== email && userExists) {
    return res.status(400).json({
      message: "E-mail já cadastrado, por gentileza utilize outro.",
    });
  }

  user.email = email;

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "As senhas não coincidem.",
    });
  } else if (password === confirmPassword && password != null) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  try {
    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true }
    );
    return res.status(200).json({
      message: "Usuário atualizado com sucesso.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
}
