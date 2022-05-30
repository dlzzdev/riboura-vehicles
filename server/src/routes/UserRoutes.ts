import express from "express";
import { register, login, checkUser } from "../controllers/UserController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkuser", checkUser);

export default router;
