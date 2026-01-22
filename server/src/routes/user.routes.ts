import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import {editUserProfile, getUser, updateAvatar, deleteAccount, deleteAvatar} from '../controllers/user.controller'
const router = Router();

router.get("/me",authMiddleware, getUser );
router.patch("/me",authMiddleware, editUserProfile );
router.delete("/me", authMiddleware , deleteAccount);
router.post("/me/avatar", authMiddleware ,upload.single('avatar'), updateAvatar);
router.delete("/me/avatar", authMiddleware , deleteAvatar);

export default router;
