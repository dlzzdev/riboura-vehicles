import express from "express";
import { register } from "../controllers/UserController";

const router = express.Router();

router.post("/register", register);

export default router;
