import express from "express";
import authentication from "../middlewares/authentication.middleware.js";
import adminAuth from "../middlewares/adminAuth.middleware.js";
import { addAnimal, getAllAnimal, getAnimalInformation, removeAnimal, updateAnimal } from "../controller/animal.controller.js";


const animalRouter = express.Router();

animalRouter
.post("/addAnimal",authentication,adminAuth,addAnimal)
.put("/updateAnimalInfo/:id",authentication,adminAuth,updateAnimal)
.delete("/removeAnimal/:id",authentication,adminAuth,removeAnimal)
.get("/getAnimalInfo/:id",authentication,getAnimalInformation)
.get("/getAllAnimal",authentication,getAllAnimal)


export default animalRouter;