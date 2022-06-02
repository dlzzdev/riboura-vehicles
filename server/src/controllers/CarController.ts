import Car from "../models/Car";
import { Request, Response } from "express";
import { getToken } from "../helpers/getToken";
import { getUserByToken } from "../helpers/getUserByToken";
import mongoose from "mongoose";

export async function create(req: Request, res: Response) {
  const { model, brand, year, milage, price, description } = req.body;

  const available = true;

  if (!model || !brand || !year || !milage || !price) {
    return res.status(422).json({
      message: "Todos os campos são obrigatórios.",
    });
  }

  if (milage < 0 || price < 0) {
    return res.status(422).json({
      message: "O campo milage e price devem ser positivos.",
    });
  }

  let images = req.files as Express.Multer.File[];

  if (images.length === 0) {
    return res.status(422).json({
      message: "É necessário enviar pelo menos uma imagem.",
    });
  }

  const token = getToken(req);
  const user = await getUserByToken(token, res);

  const car = new Car({
    model,
    brand,
    year,
    milage,
    price,
    description,
    images: [],
    available,
    user: {
      _id: user._id,
      name: user.name,
      image: user.image,
      phone: user.phone,
    },
  });

  images.map((image: any) => {
    car.images.push(image.filename);
  });

  try {
    const newCar = await car.save();
    return res.status(201).json({
      message: "Carro cadastrado com sucesso.",
      newCar,
    });
  } catch (e) {
    res.status(500).json({ message: e });
  }
}

export async function getAll(req: Request, res: Response) {
  const cars = await Car.find().sort("-createdAt");

  return res.status(200).json({
    cars,
  });
}

export async function getAllUserCars(req: Request, res: Response) {
  const token = getToken(req);
  const user = await getUserByToken(token, res);

  const cars = await Car.find({ "user._id": user._id }).sort("-createdAt");

  return res.status(200).json({
    cars,
  });
}

export async function getAllUserPurchases(req: Request, res: Response) {
  const token = getToken(req);
  const user = await getUserByToken(token, res);

  const cars = await Car.find({ "buyer._id": user._id }).sort("-createdAt");

  return res.status(200).json({
    cars,
  });
}

export async function getCarById(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({
      message: "ID inválido.",
    });
  }

  const car = await Car.findOne({ _id: id });

  if (!car) {
    return res.status(404).json({
      message: "Veicúlo não encontrado.",
    });
  }

  return res.status(200).json({
    car,
  });
}

export async function removeCarById(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({
      message: "ID inválido.",
    });
  }

  const car = await Car.findOne({ _id: id });

  if (!car) {
    return res.status(404).json({
      message: "Veicúlo não encontrado.",
    });
  }

  const token = getToken(req);
  const user = await getUserByToken(token, res);

  if (car.user._id.toString() !== user._id.toString()) {
    return res.status(401).json({
      message: "Você não tem permissão para remover este veículo.",
    });
  }

  try {
    await Car.deleteOne({ _id: id });
    return res.status(200).json({
      message: "Veicúlo removido com sucesso.",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Erro ao remover veicúlo.",
    });
  }
}

export async function updateCar(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({
      message: "ID inválido.",
    });
  }

  const car = await Car.findOne({ _id: id });

  if (!car) {
    return res.status(404).json({
      message: "Veicúlo não encontrado.",
    });
  }

  const { model, brand, year, milage, price, description, available } =
    req.body;

  const token = getToken(req);
  const user = await getUserByToken(token, res);

  if (car.user._id.toString() !== user._id.toString()) {
    return res.status(401).json({
      message: "Você não tem permissão para atualizar este veículo.",
    });
  }

  if (!model || !brand || !year || !milage || !price) {
    return res.status(422).json({
      message: "Todos os campos são obrigatórios.",
    });
  }

  if (milage < 0 || price < 0) {
    return res.status(422).json({
      message: "O campo milage e price devem ser positivos.",
    });
  }

  const images = req.files as Express.Multer.File[];

  if (images.length > 0) {
    images.map((image: any) => {
      car.images.push(image.filename);
    });
  }

  car.model = model;
  car.brand = brand;
  car.year = year;
  car.milage = milage;
  car.price = price;
  car.description = description;

  try {
    await Car.updateOne({ _id: id }, car);
    return res.status(200).json({
      message: "Veicúlo atualizado com sucesso.",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Erro ao atualizar veicúlo.",
    });
  }
}

export async function schedule(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({
      message: "ID inválido.",
    });
  }

  const car = await Car.findOne({ _id: id });

  if (!car) {
    return res.status(404).json({
      message: "Veicúlo não encontrado.",
    });
  }

  const token = getToken(req);
  const user = await getUserByToken(token, res);

  if (car.user._id.toString() === user._id.toString()) {
    return res.status(401).json({
      message: "Você não pode agendar uma visita ao seu próprio véiculo.",
    });
  }

  if (car.buyer) {
    if (car.buyer._id.toString() === user._id.toString()) {
      return res.status(401).json({
        message: "Você já agendou uma visita a este veículo.",
      });
    }
  }

  car.buyer = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    image: user.image,
  };

  try {
    await Car.updateOne({ _id: id }, car);
    return res.status(200).json({
      message: `Agendamento realizado com sucesso, entre em contato com ${car.user.name} para confirmar a visita.`,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Erro ao agendar visita.",
    });
  }
}

export async function concludeSale(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({
      message: "ID inválido.",
    });
  }

  const car = await Car.findOne({ _id: id });

  if (!car) {
    return res.status(404).json({
      message: "Veicúlo não encontrado.",
    });
  }

  const token = getToken(req);
  const user = await getUserByToken(token, res);

  if (car.user._id.toString() !== user._id.toString()) {
    return res.status(401).json({
      message: "Você não tem permissão para concluir a compra deste veículo.",
    });
  }

  if (!car.available) {
    return res.status(401).json({
      message: "Você já concluiu a venda deste veículo.",
    });
  }

  car.available = false;

  try {
    await Car.updateOne({ _id: id }, car);
    return res.status(200).json({
      message: "A compra foi concluída com sucesso.",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Erro ao concluir compra.",
    });
  }
}
