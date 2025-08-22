import express from "express"
import userRouter from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./src/middlewares/errorHandler.middleware.js";


const app = express();

app.use(express.json());
app.use(express.Router());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user', userRouter)

app.use(errorHandlerMiddleware);

export default app

