import { Router } from "express";
import { register, login, refresh, refreshController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshController);
router.get("/me", authMiddleware, refresh);

export default router;
