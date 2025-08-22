import express from "express"

const app = express();

app.use(express.json());
app.use(express.Router());
app.use(express.urlencoded({ extended: true }));


export default app

