import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";

const router = Router();

// localhost:5000/users/ -> /
// post method
router.post('/', userController.createUser);

// get all users
router.get('/', userController.getUsers)

export const userRoutes = router;