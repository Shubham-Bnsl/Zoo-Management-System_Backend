import express from "express"
import { loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import authentication from "../middlewares/authentication.middleware.js";

const userRouter = express.Router();


userRouter.post('/signUp',registerUser)
userRouter.post('/logIn',loginUser)
userRouter.get('/logOut',authentication,logoutUser)



export default userRouter;