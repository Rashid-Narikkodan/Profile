import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { deleteUser, getAllUsers, getUser, toggleStatus, updateUser, createUser } from "../controllers/admin.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router()

router.use(authMiddleware)
router.use(adminMiddleware)

router.get('/users',getAllUsers)
router.post('/users/add',createUser)
router.get('/users/:id',getUser)
router.patch('/users/:id/status',toggleStatus)
router.patch('/users/:id',updateUser)
router.delete('/users/:id/delete',deleteUser)

export default router