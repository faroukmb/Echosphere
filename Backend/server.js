import express from "express";
import "dotenv/config";
import cors from 'cors'
import connectDB from "./config/mongoDB.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRouter.js";
import cookieParser from "cookie-parser";
import connectCloudinary from "./config/cloudinary.js";
const app = express();
const port = process.env.PORT
connectDB();
connectCloudinary();
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use("/api/user",userRouter);
app.use("/api/post",postRouter)
app.get("/",(req,res)=>{
    res.send('hello world');
})

app.listen(port,()=>{
    console.log("server active on port "+port);
    
})