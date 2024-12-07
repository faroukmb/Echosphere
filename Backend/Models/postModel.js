import mongoose, { Schema } from "mongoose";
const PostSchema = new mongoose.Schema({
  title:String,
  summary:String,
  content:String,
  cover: String,
  authorId:{type: Schema.Types.ObjectId , ref:'user'},
  authorname: String 
}, {
  timestamps: true,
});

const postModel= mongoose.models.post || mongoose.model("post",PostSchema);
export default postModel;