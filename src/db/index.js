import mongoose from "mongoose";

const db = async()=>{
      await mongoose.connect('mongodb+srv://bansalsbhm:shubham@cluster0.qyiuucm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

      console.log("Database connected");

}

export default db;
