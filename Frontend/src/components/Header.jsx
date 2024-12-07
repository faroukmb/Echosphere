
import { Link, NavLink } from "react-router-dom";
import myImage from "../assets/logo.png";
import { context } from "../context/context";
import { useContext} from "react";
const Header = () => {
   const { token, setToken,username,setUsername ,navigate} = useContext(context);

    function logout() {
      setToken("");
      setUsername("")
      localStorage.removeItem("token");
      localStorage.removeItem("username")
      navigate("/")
    }

  return (
    <div className=" flex items-center w-full bg-yellow-400 h-20 justify-between">
      <div className="flex items-center ">
        <img src={myImage} className="h-28 " alt="logo" />
        <Link to="/">
          <h1 className="text-2xl -ml-6">EchoSphere</h1>
        </Link>
      </div>
      {!token ? (
        <div>
          
            <NavLink to="/login" className="mr-14 hover:underline">
              Login
            </NavLink>

            <NavLink to="/register" className="mr-14 hover:underline">
              Register
            </NavLink>
            </div>
    
      ) : (
        <div className="">
          <NavLink to="/create" className="mr-3 hover:underline">
            Create new Post
          </NavLink>
          <button
            className="bg-transparent mr-2 hover:underline"
            onClick={() => {
              logout();
            }}
          >
            {`Logout (${username})`}
          </button>
        </div>
      )}
    </div>
  );
}

export default Header