import { Router } from "express";
import { register, login, getMe, refreshController, logoutController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshController);
router.get("/me", authMiddleware, getMe);
router.post("/logout", authMiddleware, logoutController);

export default router;
