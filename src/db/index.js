import mongoose from "mongoose";

const db = async()=>{
      await mongoose.connect(process.env.MONGODB);
      console.log("Database connected");

}

export default db;
