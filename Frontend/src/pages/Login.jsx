import { useContext, useEffect, useState } from 'react'
import { Link} from 'react-router-dom';

import { context } from '../context/context';
import toast from 'react-hot-toast';
import axios from 'axios';
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const {setUsername,username,backendurl,setToken,token,navigate} =useContext(context)
 async function onSubmitHandler(ev) {
   ev.preventDefault();
   try {
     const res = await axios.post(backendurl+ "/api/user/login",{email,password});
     if(res.data.success){
       setToken(res.data.token);
       setUsername(res.data.user.username)
       localStorage.setItem("token",res.data.token);
       localStorage.setItem("username",res.data.user.username);
       toast.success("Log in successfully");
       console.log(res.data)
     }
     else{
       toast.error(res.data.message);
     }
   } catch (error) {
       console.log(error);
       
   }
 }
 useEffect(()=>{
    if(token){
        navigate("/")
    }
 },[token])
 
  return (
    <div className="flex flex-col justify-center items-center mt-11 p-10">
      <h1 className="text-4xl">Login</h1>
      <p className='mb-5'> Don t have an account? <Link to="/register" className='text-yellow-400 hover:underline'>Sign up</Link>
      </p>
      <form className="w-1/2 flex flex-col items-center" onSubmit={onSubmitHandler}>
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
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-yellow-400 p-3 rounded-md hover:bg-yellow-300">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login