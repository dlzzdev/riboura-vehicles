import express from "express";
import {
  register,
  login,
  checkUser,
  getUserById,
  editUser,
} from "../controllers/UserController";
import { imageUpload } from "../helpers/imageUpload";
import { verifyToken } from "../helpers/verifyToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkuser", checkUser);
router.get("/:id", getUserById);
router.patch("/edit/:id", verifyToken, imageUpload.single("image"), editUser);

export default router;
