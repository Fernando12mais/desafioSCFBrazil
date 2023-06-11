import express from "express";
import userController from "../controllers/users.js";
import permissionMiddleware from "../middlewares/permission.js";

const userRouter = express.Router();

userRouter.get("/", function (req, res) {
  res.send(`get user/ </br>
    get users/ </br>
    post users/ </br>
    delete users/ </br>
    put users/ </br>
    `);
});

userRouter.get("/users/:id", userController.getUser);
userRouter.get("/users", userController.getUsers);
userRouter.post("/users", userController.createUser);
userRouter.delete(
  "/users/:id",
  permissionMiddleware,
  userController.deleteUser
);
userRouter.put("/users/:id", permissionMiddleware, userController.updateUser);
userRouter.get("/users/:id/access", userController.getUserAccessedCount);
userRouter.put("/permissions", userController.updateUserPermission);

export default userRouter;
