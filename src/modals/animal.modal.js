import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({

name:{
    type: String,
    required: true,
    unique:true
},

species:{
    type: String,
    required: true,
    enum:['mammal', 'bird', 'reptile']
},

age:{
    type: Number,
    required: true
},

health_status:{
    type: String,
    required: true,
},

feeding_schedule:{
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
quantity:{
    type: Number,
    required: true
}
},{timestamps: true})


const Animal = mongoose.model("Animal", animalSchema);

export default Animal;