import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://viswavanithaguttula:vanitha2005@cluster0.ojywci1.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}