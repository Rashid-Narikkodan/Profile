import { Router } from "express";
import { register, login, getMe, refreshController, logoutController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireActiveUser } from "../middlewares/status.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshController);

router.use(authMiddleware)
router.use(requireActiveUser)

router.get("/me", getMe);
router.post("/logout", logoutController);

export default router;
