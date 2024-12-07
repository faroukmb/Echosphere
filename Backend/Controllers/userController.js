
import jwt from "jsonwebtoken"
import userModel from "../Models/UserModel.js";
import bcrypt from "bcrypt"
import validator from "validator";
const createToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}
const register =async (req,res)=>{
    try {
         const {username,email,password} =req.body;
         const exist = await userModel.findOne({email})
         const nameexist= await userModel.findOne({username})
         if(nameexist){
            return res.json({success: false, message: "Username Already Exists! please enter a different one!"})
         }
         if(exist){
            return res.json({success: false, message: "User Already Exists!"})
         }
      
         if(!validator.isEmail(email)){
             return res.json({
               success: false,
               message: "Invalid email!",
             });
         }
         if(password.length < 8){
         return res.json({ success: false, message: "Password Too Weak!" });
         }

         const salt =await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password,salt);

         const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
         });
         const user = newUser.save();
         res.json({success:true,user});
    } catch (error) {
         return res.json({ success: false, message: error.message });
    }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user does not exists" });
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.json({ success: false, message: "Incorrect Password" });
    } else {
       const token = createToken(user._id);
       res.json({success:true,token,user})
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export {login,register}