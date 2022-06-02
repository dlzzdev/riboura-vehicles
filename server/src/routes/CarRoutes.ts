import express from "express";
import {
  create,
  getAll,
  getAllUserCars,
  getAllUserPurchases,
  getCarById,
  removeCarById,
  updateCar,
  schedule,
  concludeSale,
} from "../controllers/CarController";
import { imageUpload } from "../helpers/imageUpload";
import { verifyToken } from "../helpers/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, imageUpload.array("images"), create);
router.get("/", getAll);
router.get("/mycars", verifyToken, getAllUserCars);
router.get("/mypurchases", verifyToken, getAllUserPurchases);
router.get("/:id", getCarById);
router.delete("/:id", verifyToken, removeCarById);
router.patch("/:id", verifyToken, imageUpload.array("images"), updateCar);
router.patch("/schedule/:id", verifyToken, schedule);
router.patch("/conclude/:id", verifyToken, concludeSale);

export default router;
