/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"

export const context = createContext();
const ContextProvider = ({children})=>{
    const [username,setUsername]=useState("")
    const [posts, setPosts] = useState([]);
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [token,setToken] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
      if (!token && localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        setUsername(localStorage.getItem("username"))
      }
    }, []);
    return (
        <context.Provider value={{username,setUsername,backendurl,navigate,token,setToken,setPosts,posts}}>
            {children}
        </context.Provider>
    )
}
export default ContextProvider;