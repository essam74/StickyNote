import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as userController from "./controller/user.js";
const router = Router();

router.get("/", userController.getUsers);
router.get("/profile", auth, userController.userProfile);

router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
