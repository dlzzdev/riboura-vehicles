import Car from "../models/Car";
import { Request, Response } from "express";
import { getToken } from "../helpers/getToken";
import { getUserByToken } from "../helpers/getUserByToken";

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
