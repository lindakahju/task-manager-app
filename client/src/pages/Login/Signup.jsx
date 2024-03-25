import React, { useState } from "react";
import axios from 'axios';
import "./../Login/login.scss";
import logo from "./../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
  })

  // const registerUser = async (e) => {
  //   e.preventDefault()
  //   const {username, password} = data
  //   try {
  //     const {data} = await axios.post('/signup', {
  //       username, password
  //     })
  //     if(data.error) {
  //       console.log(data.error);
  //     } else {
  //       setData({})
  //       navigate('/login')
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }



  const signupUser = async (e) => {
    e.preventDefault()
    const {username, password} = data
    try {
      const {data} = await axios.post('/signup', {
        username, password
      })
      if(data.error) {
        console.log(data.error);
      } else {
        setData({})
        console.log("success!");
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <section className="login">
      <img src={logo} alt="logo" className="logo" />
      <form className="login__form" onSubmit={signupUser}>
        <label>
          Username:
          <input className="login__input" name="newUsername" type="text" value={data.username} onChange={(e) => setData({...data, username: e.target.value})} />
        </label>
        <label>
          Password:
          <input className="login__input" name="newPassword" type="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        </label>

        <button  className="login__btn" type="submit">
          Create account
        </button>
      </form>
      <section className="login__signup">
        <p>Already have an account?</p>
        <p>
          Log in{" "}
          <b className="link" >
             here!
          </b>
        </p>
      </section>
    </section>
  );
}

export default Signup;
