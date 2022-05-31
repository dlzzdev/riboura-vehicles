import express from "express";
import { create } from "../controllers/CarController";
import { imageUpload } from "../helpers/imageUpload";
import { verifyToken } from "../helpers/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, imageUpload.array("images"), create);

export default router;
