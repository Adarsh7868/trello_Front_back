import React from "react";
import { useDispatch } from "react-redux";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
// import { findOneLogin } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    //  Validations
    if (!email || !password ) {
      alert("Please fill all the fields");
      return
    }
    // else if (password.length > 4 && password.length < 15) {
    //   alert("Password must be greater than 4 characters");
    // } else if (!email.includes("@")) {
    //   alert("Invalid email");
    // } else if (!email.includes(".")) {
    //   alert("Invalid email");
    // }
    //  else if (findOneLogin(email) === null) {
    //   alert("Invalid email");
    // }
    dispatch(loginUser({email , password}));
  };
  return (
    <>
       <div className="login"> 
        <h2>Login</h2>
        <label htmlFor="email">Email</label> <br />
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="password">Password</label> <br />
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        /> 
        <br />
        <br />
        <button type="submit" className="btn btn-primary" 
        onClick = {handleLogin} style={{backgroundColor:"black"}}
        > Login
        </button>
        <br />
        <br />
        <button
          type="register  "
          className="btn btn-primary"
          onClick={(e) => {
            navigate("/register");
          }}
          style={{backgroundColor:"black"}}
        >Register
        </button>
      </div>
    </>
  );
};

export default Login;
