import express from "express"
import userRouter from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(express.Router());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user', userRouter)


export default app

