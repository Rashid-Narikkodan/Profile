import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import {editUserProfile, getUser, updateAvatar, deleteAccount, deleteAvatar} from '../controllers/user.controller'
import { requireActiveUser } from "../middlewares/status.middleware";
const router = Router();

router.use(authMiddleware)
router.use(requireActiveUser)

router.get("/me", getUser );
router.patch("/me", editUserProfile);
router.delete("/me", deleteAccount);
router.post("/me/avatar" ,upload.single('avatar'), updateAvatar);
router.delete("/me/avatar" , deleteAvatar);

export default router;
