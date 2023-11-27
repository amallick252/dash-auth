import './signup.scss'
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from "../../appwrite/auth"
import { useDispatch } from 'react-redux'
import {login as authLogin} from '../../store/authSlice'
import {useForm} from "react-hook-form"
import Input from "../../components/input/Input"


const Signup = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const {register, handleSubmit} = useForm()

  const create = async(data)=>{
    setError("")
    try {
      const userData = await authService.createAccount(data)
    if(userData){
      const userData = await authService.getCurrentUser()
      if(userData){
        dispatch(authLogin(userData))
        navigate('/')
      }
    }
    } catch (error) {
      setError(error.message)
      console.log(error)
    }
  }

  return (
    <div className="background">
      <div className="wrapper">
        <h1>Signup</h1>
        <form className="form" onSubmit={handleSubmit(create)}>
          <div className="name">
            <div className="nameBox">
              {/* <label htmlFor="name"></label>
              <input id="name" type="text" placeholder="name" className="nameInput"
              {...register('name',{required:true})}
              ></input> */}
              <Input
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
              />
            </div>
            <img src="user-icon.png" alt="" className="nameIcon" />
          </div>
          <div className="email">
            <div className="emailBox">
              {/* <label htmlFor="email"></label>
              <input id="email" type="email" placeholder="email" className="emailInput"
              {...register('email',{required:true,
              validate:{
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
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
            <img src="email-icon.png" alt="" className="emailIcon" />
          </div>
          <div className="pass">
            <div className="passBox">
              {/* <label htmlFor="password"></label>
              <input id="password" type="password" placeholder="password" className="passInput"
              {...register('password',{required:true})}
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
              <label htmlFor="checkbox">  Remember Me</label>
            </div>
            {/* <p className="rememberPass"><a href="#">Forgot Password?</a></p> */}
          </div>
          <button className="login">Signup</button>
          <div className="noAccount">Already have an account? <b><Link to = "/login">Login</Link></b></div>
        </form>
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default Signup