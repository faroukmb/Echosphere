import postModel from "../Models/postModel.js";
import { v2 as cloudinary } from "cloudinary"; 
import jwt from "jsonwebtoken"
import userModel from "../Models/UserModel.js";
const createPost = async (req,res)=>{
  try {
     const {title,summary,content} = req.body;
     const image = req.file
     console.log(image);
     
     if (!image){
      return res.json({success:false, message:"image not found"
      })
     }
     if (!title){
      return res.json({success:false, message:"Title not provided!"})
     }
     if (!summary) {
       return res.json({ success: false, message: "Summary not provided!" });
     }
     if (!content) {
       return res.json({ success: false, message: "Content not provided!" });
     }
     const result = await cloudinary.uploader.upload(image.path,{resource_type: 'image'})
     const imageUrl = result.secure_url;
     const {token} = req.headers;
     if(!token){
      return res.json({success:false,message: "no token provided!"})
     }
     const tokendecode = jwt.verify(token,process.env.JWT_SECRET);
     const userId = tokendecode.id
     const user = await userModel.findById(userId);
     if(!user){
      return res.json({ success: false, message: "User not found!" });
     }

     const postData = {
       title,
       summary,
       content,
       cover: imageUrl,
       authorId: userId,
       authorname: user.username,
     };
     const newPost =new postModel(postData);
     await newPost.save();
     res.json({success:true,newPost});
     } catch (error) {
     console.log(error);
     
  }
}
 const getAllPosts = async (req,res) =>{
      try {
        const posts = await postModel.find({})
        if(posts.length >0){
             res.json({success:true,posts})
        }
      } catch (error) {
         console.log(error);
         
      }
 }
 const getPostById = async (req,res)=>{
  try {
     const {id} = req.body;
     const post = await postModel.findById(id);
     if(post){
      res.json({success:true,post})
     }
     else{
      res.json({success:false,message:"post does not exist"});
     }
     
  } catch (error) {
     res.json({ success: false, message: error.message });
  }
 }
 const deletePost = async (req,res)=>{
  try {
    const {id} =req.body;
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "no token provided!" });
    }
     const tokendecode = jwt.verify(token, process.env.JWT_SECRET);
     const userId = tokendecode.id;
     const user = await userModel.findById(userId);
     const post = await postModel.findById(id);

     if (userId.toString() !== post.authorId.toString()) {
       console.log(user._id);
       console.log(post.authorId);
       return res.json({
         success: false,
         message: "You are not autorized to Delete this post!",
       });
     }
     await postModel.findByIdAndDelete(id);
     res.json({success:true,message :"Post Deleted Successfully!"})
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
 }
 const updatePost = async (req,res) =>{
  try {
    const {id , title , summary , content}= req.body;
     const image = req.file;
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      const imageUrl = result.secure_url;
    const {token} =req.headers;
    if (!token) {
      return res.json({ success: false, message: "no token provided!" });
    }
    const tokendecode = jwt.verify(token, process.env.JWT_SECRET);
    const userId = tokendecode.id;
    const user = await userModel.findById(userId);
    const post = await postModel.findById(id);
    
    if(userId.toString() !== post.authorId.toString()){
      console.log(user._id);
       console.log(post.authorId)
      return res.json({ success: false, message: "You are not autorized to edit this post!" });
    }
    else{
       const editedData = {
        title,
        summary,
        content,
        cover: imageUrl,
       }
       await postModel.findByIdAndUpdate(id,{...editedData})
       res.json({success:true,message: "post edited succefully"})
    }

  } catch (error) {
     res.json({ success: false, message: error.message });
  }
 }

export{
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
