import { Request, Response, Router } from "express";
import { userController } from "./user.controller";


const router = Router();

// localhost:5000/users/ -> /
// post method
router.post('/', userController.createUser);

// get all users
router.get('/', userController.getUsers)

// get single user
router.get('/:id', userController.getSingleUser)

// update a user
router.put('/:id', userController.updateUser)

// delete a user
router.delete('/:id', userController.deleteUser)

export const userRoutes = router;