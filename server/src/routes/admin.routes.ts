import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { deleteUser, getAllUsers, getUser, toggleStatus, updateUser, createUser, updateAvatarByAdmin, deleteAvatarByAdmin } from "../controllers/admin.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { upload } from "../middlewares/upload.middleware";
import { requireActiveUser } from "../middlewares/status.middleware";

const router = Router()

router.use(authMiddleware)
router.use(adminMiddleware)
router.use(requireActiveUser)

router.get('/users',getAllUsers)
router.post('/users/add',createUser)
router.get('/users/:id',getUser)
router.patch('/users/:id/status',toggleStatus)
router.patch('/users/:id',updateUser)
router.delete('/users/:id/delete',deleteUser)
router.post('/users/:id/avatar',upload.single('avatar'),updateAvatarByAdmin)
router.delete('/users/:id/avatar',deleteAvatarByAdmin)

export default router