import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../../store/authSlice";
import { useState } from "react";
import Input from "../../components/input/Input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const season = await authService.login(data);
      if (season) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="background">
      <div className="wrapper">
        <h1>Login</h1>
        <form className="form" onSubmit={handleSubmit(login)}>
          <div className="uname">
            <div className="userNameBox">
              {/* <label htmlFor="username"></label>
              <input
                id="username"
                type="email"
                placeholder="email"
                className="userInput"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              ></input> */}
              <Input
                type="email"
                placeholder="email"
                {...register('email',{required:true,
                  validate:{
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  },
                  })}
              />
            </div>
            <img src="user-icon.png" alt="" className="userNameIcon" />
          </div>
          <div className="pass">
            <div className="passBox">
              {/* <label htmlFor="password"></label>
              <input id="password" type="password" placeholder="password" className="passInput"
              {...register("password", {
                required: true,
            })}
              ></input> */}
              <Input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
            <img src="lock-icon.png" alt="" className="passwordIcon" />
          </div>

          <div className="forgetPass">
            <div className="textBox">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox"> Remember Me</label>
            </div>

            <p className="rememberPass">
              <a href="#">Forgot Password?</a>
            </p>
          </div>
          <button className="login" type="submit">
            Login
          </button>
          <div className="error">
            {error && <div className="error">{error}</div>}
          </div>
          <div className="noAccount">
            Dont have an account?{" "}
            <b>
              <Link to="/signup">Register</Link>
            </b>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
