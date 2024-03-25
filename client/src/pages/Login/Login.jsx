import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./../Login/login.scss";
import logo from "./../../assets/logo.svg";

function Login() {
  const navigate = useNavigate(); 
  const [data, setData] = useState({
    username: '',
    password: '',
  })



  const loginUser = async (e) => {
    e.preventDefault();
    const {username, password} = data
    try {
      const {data} = await axios.post('/login', {
        username,
        password
      });
      if (data.error) {
        console.log("login did not work");
      } else {
        setData({});
        navigate('/')
      }
    } catch (error) {
      
    }
  };

  return (
    <section className="login">
      <img src={logo} alt="logo" className="logo" />
      <form className="login__form" onSubmit={loginUser}>
        <label>
          Username:
          <input className="login__input" name="username" type="text" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}  />
        </label>
        <label>
          Password:
          <input className="login__input" name="password" type="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}  />
        </label>
        <button className="login__btn" type="submit">
          Log in
        </button>
      </form>
      <section className="login__signup">
        <p>No account yet?</p>
        <p className="login__link">
          Sign up{" "}
          <b className="link" >
            here!
          </b>
        </p>
      </section>
    </section>
  );
}

export default Login;
