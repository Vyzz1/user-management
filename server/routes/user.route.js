import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.get("/", userController.getUsers);

userRoute.get("/:id", userController.getUserById);

userRoute.post("/", userController.createUser);

userRoute.put("/:id", userController.updateUser);

userRoute.delete("/:id", userController.deleteUser);

export default userRoute;
