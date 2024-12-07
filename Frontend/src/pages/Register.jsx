
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { context } from "../context/context";
import { useContext } from "react";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const {backendurl,navigate}=useContext(context);
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(backendurl +"/api/user/register",{username,email,password});
      if(res.data.success){
        toast.success("Sign up successfully");
        navigate("/login")
      }
      else{
        toast.error(res.data.message);
      }
         
    } catch (error) {
      console.log(error.message);
      
    }
  }
  return (
    <div className="flex flex-col justify-center items-center mt-11 p-10">
      <h1 className="text-4xl">Register</h1>
      <p className="mb-5">
        Already have an acount?{" "}
        <Link to="/login" className="text-yellow-400 hover:underline">
          Log in
        </Link>
      </p>
      <form className="w-1/2 flex flex-col items-center" onSubmit={onSubmitHandler}>
        <input
          type="text"
          className="border border-black border-solid rounded-md p-3 w-full mb-5"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          className="border border-black border-solid rounded-md p-3 w-full mb-5"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="border border-black border-solid rounded-md p-3 w-full mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} required
        />
        
        <button className="bg-yellow-400 p-3 rounded-md hover:bg-yellow-300">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
