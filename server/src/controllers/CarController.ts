import Vehicle from "../models/Vehicle";
import { Request, Response } from "express";
import { getToken } from "../helpers/getToken";
import { getUserByToken } from "../helpers/getUserByToken";

export async function createVehicle(req: Request, res: Response) {
  const {
    brand,
    model,
    years,
    shift,
    fuel,
    steering,
    motor_power,
    type,
    mileage,
    color,
    price,
  } = req.body;

  const available = true;

  if (
    !brand ||
    !model ||
    !years ||
    !shift ||
    !fuel ||
    !steering ||
    !motor_power ||
    !type ||
    !mileage ||
    !color ||
    !price
  ) {
    return res.status(422).json({
      message: "Todos os campos são obrigatórios.",
    });
  }

  if (mileage < 0 || price < 0 || years < 0) {
    return res.status(422).json({
      message:
        "Os campos de ano, quilometragem e preço devem ter números positivos.",
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

  const vehicle = new Vehicle({
    brand,
    model,
    years,
    shift,
    fuel,
    steering,
    motor_power,
    type,
    mileage,
    color,
    price,
    images: [],
    available,
    user: {
      _id: user._id,
      name: user.name,
      image: user.image,
      email: user.email,
      phone: user.phone,
    },
  });

  images.map((image: any) => {
    vehicle.images.push(image.filename);
  });

  try {
    await vehicle.save();
    return res.status(201).json({
      message: "Anúncio criado com sucesso.",
    });
  } catch (e) {
    res.status(500).json({ message: e });
  }
}

export async function getAllVehicles(req: Request, res: Response) {
  const vehicles = await Vehicle.find().sort("-createdAt");

  return res.status(200).json({
    vehicles,
  });
}

export async function getAllUserVehicles(req: Request, res: Response) {
  const token = getToken(req);
  const user = await getUserByToken(token, res);

  const vehicles = await Vehicle.find({ "user._id": user._id }).sort(
    "-createdAt"
  );

  return res.status(200).json({
    vehicles,
  });
}

export async function getAllUserPurchases(req: Request, res: Response) {
  const token = getToken(req);
  const user = await getUserByToken(token, res);

  const vehicles = await Vehicle.find({ "buyer._id": user._id }).sort(
    "-createdAt"
  );

  return res.status(200).json({
    vehicles,
  });
}

export async function getVehicleById(req: Request, res: Response) {
  const { id } = req.params;

  const vehicle = await Vehicle.findOne({ _id: id });

  if (!vehicle) {
    return res.status(404).json({
      message: "O veículo não foi encontrado.",
    });
  }

  return res.status(200).json({
    vehicle,
  });
}

export async function removeVehicleById(req: Request, res: Response) {
  const { id } = req.params;

  const vehicle = await Vehicle.findOne({ _id: id });

  if (!vehicle) {
    return res.status(404).json({
      message: "O veículo não foi encontrado.",
    });
  }

  const token = getToken(req);
  const user = await getUserByToken(token, res);

  if (vehicle.user._id.toString() !== user._id.toString()) {
    return res.status(401).json({
      message: "Você não tem permissão para remover o anúncio.",
    });
  }

  try {
    await Vehicle.deleteOne({ _id: id });
    return res.status(200).json({
      message: "Anúncio removido com sucesso.",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Erro ao remover o anúncio.",
    });
  }
}

export async function updateVehicle(req: Request, res: Response) {
  const { id } = req.params;

  const vehicle = await Vehicle.findOne({ _id: id });

  if (!vehicle) {
    return res.status(404).json({
      message: "O veículo não foi encontrado.",
    });
  }

  const {
    brand,
    model,
    years,
    shift,
    fuel,
    steering,
    motor_power,
    type,
    mileage,
    color,
    price,
  } = req.body;

  const token = getToken(req);
  const user = await getUserByToken(token, res);

  if (vehicle.user._id.toString() !== user._id.toString()) {
    return res.status(401).json({
      message: "Você não tem permissão para atualizar este anúncio.",
    });
  }

  if (
    !brand ||
    !model ||
    !years ||
    !shift ||
    !fuel ||
    !steering ||
    !motor_power ||
    !type ||
    !mileage ||
    !color ||
    !price
  ) {
    return res.status(422).json({
      message: "Todos os campos são obrigatórios.",
    });
  }

  if (mileage < 0 || price < 0 || years < 0) {
    return res.status(422).json({
      message:
        "Os campos de ano, quilometragem e preço devem ter números positivos.",
    });
  }

  const images = req.files as Express.Multer.File[];

  if (images.length > 0) {
    images.map((image: any) => {
      vehicle.images.push(image.filename);
    });
  }

  vehicle.brand = brand;
  vehicle.model = model;
  vehicle.years = years;
  vehicle.shift = shift;
  vehicle.fuel = fuel;
  vehicle.steering = steering;
  vehicle.motor_power = motor_power;
  vehicle.type = type;
  vehicle.mileage = mileage;
  vehicle.color = color;
  vehicle.price = price;

  try {
    await Vehicle.updateOne({ _id: id }, vehicle);
    return res.status(200).json({
      message: "Anúncio atualizado com sucesso.",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Erro ao atualizar o anúncio.",
    });
  }
}

export async function scheduleVehicle(req: Request, res: Response) {
  const { id } = req.params;

  const vehicle = await Vehicle.findOne({ _id: id });

  if (!vehicle) {
    return res.status(404).json({
      message: "O veículo não foi encontrado.",
    });
  }

  const token = getToken(req);
  const user = await getUserByToken(token, res);

  if (vehicle.user._id.toString() === user._id.toString()) {
    return res.status(401).json({
      message: "Você não pode agendar uma visita ao seu próprio véiculo.",
    });
  }

  if (vehicle.buyer) {
    if (vehicle.buyer._id.toString() === user._id.toString()) {
      return res.status(401).json({
        message: "Você já agendou uma visita a este veículo.",
      });
    }
  }

  vehicle.buyer = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    image: user.image,
  };

  try {
    await Vehicle.updateOne({ _id: id }, vehicle);
    return res.status(200).json({
      message: `Agendamento realizado com sucesso, entre em contato com ${vehicle.user.name} para confirmar a visita.`,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Erro ao agendar visita.",
    });
  }
}

export async function concludeSale(req: Request, res: Response) {
  const { id } = req.params;

  const vehicle = await Vehicle.findOne({ _id: id });

  if (!vehicle) {
    return res.status(404).json({
      message: "O veículo não foi encontrado.",
    });
  }

  const token = getToken(req);
  const user = await getUserByToken(token, res);

  if (vehicle.user._id.toString() !== user._id.toString()) {
    return res.status(401).json({
      message: "Você não tem permissão para finalizar este anúncio.",
    });
  }

  if (!vehicle.available) {
    return res.status(401).json({
      message: "Este veículo já foi vendido.",
    });
  }

  vehicle.available = false;

  try {
    await Vehicle.updateOne({ _id: id }, vehicle);
    return res.status(200).json({
      message: "Anúncio finalizado com sucesso.",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Erro ao finalizar o anúncio.",
    });
  }
}
