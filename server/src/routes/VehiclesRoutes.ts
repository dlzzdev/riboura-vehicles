import { Router } from "express";
import {
  createVehicle,
  getAllVehicles,
  getAllUserVehicles,
  getAllUserPurchases,
  getVehicleById,
  removeVehicleById,
  updateVehicle,
  scheduleVehicle,
  concludeSale,
} from "../controllers/CarController";
import { imageUpload } from "../helpers/imageUpload";
import { verifyId } from "../helpers/verifyId";
import { verifyToken } from "../helpers/verifyToken";

const router = Router();

router.post("/create", verifyToken, imageUpload.array("images"), createVehicle);
router.get("/", getAllVehicles);
router.get("/myvehicles", verifyToken, getAllUserVehicles);
router.get("/mypurchases", verifyToken, getAllUserPurchases);
router.get("/:id", verifyId, getVehicleById);
router.delete("/:id", verifyToken, verifyId, removeVehicleById);
router.patch(
  "/:id",
  verifyToken,
  verifyId,
  imageUpload.array("images"),
  updateVehicle
);
router.patch("/schedule/:id", verifyToken, verifyId, scheduleVehicle);
router.patch("/conclude/:id", verifyToken, verifyId, concludeSale);

export default router;
