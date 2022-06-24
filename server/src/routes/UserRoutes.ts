import { Router } from "express";
import {
  register,
  login,
  checkUser,
  getUserById,
  editUser,
} from "../controllers/UserController";
import { imageUpload } from "../helpers/imageUpload";
import { verifyId } from "../helpers/verifyId";
import { verifyToken } from "../helpers/verifyToken";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkuser", checkUser);
router.get("/:id", verifyId, getUserById);
router.patch(
  "/edit/:id",
  verifyToken,
  verifyId,
  imageUpload.single("image"),
  editUser
);

export default router;
