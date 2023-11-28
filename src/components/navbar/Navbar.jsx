import "./navbar.scss";
import { useDispatch } from "react-redux";
import authService  from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch= useDispatch()
  const navigate = useNavigate()

  const handleLogout = async()=>{
    const loggedOut = await authService.logout()
    .then(()=> dispatch(logout))
    .then(()=>navigate("/login"))
    
   }
  return (
    <div className="navbar">
      <Link to="/">
      <div className="logo">
        <img src="/logo.svg" alt="" />
        <span>lamadmin</span>
      </div>
      </Link>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="/abinash.jpeg"
            alt=""
          />
          <span className="userName">Abinash</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
        <button className="button" onClick = {handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
