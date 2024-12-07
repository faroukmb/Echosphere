import express from "express"
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../Controllers/postController.js";
import upload from "../Middlewares/multer.js";
const postRouter = express.Router();

postRouter.post("/create",upload.single("image"), createPost);
postRouter.get("/all",getAllPosts);
postRouter.post("/single",getPostById);
postRouter.post("/edit",upload.single("image"),updatePost);
postRouter.post("/delete" ,deletePost)
export default postRouter