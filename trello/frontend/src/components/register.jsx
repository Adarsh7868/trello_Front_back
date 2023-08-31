import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import './register.css'  
// import  { useMutation, gql } from '@apollo/client'

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [phone, setPhone] = useState("")
  
  const dispatch = useDispatch();

  const registerHandle = async() => {
              //  Validations
    if(  !email || !password || !name || !phone){
      alert("Please fill all the fields")
      return
    }else if(password.length < 6){
      alert("Password must be atleast 6 characters")
      return
    }
    else if(!email.includes("@")){
      alert("Invalid email")
      return
    }
    else if(!email.includes(".")){
      alert("Invalid email")
      return
    }
  
    const createLoginInput = {
      name,
      email,
      password,
      phone
    };
    dispatch(createUser(createLoginInput));
    navigate("/");
  };
  return (
    <>
    <div className="form">
      <h2>Register</h2>
      
      <label htmlFor="name">Name</label>
      <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <label htmlFor="email">Email</label>
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
    
      <br/>
      <label htmlFor="password">Password</label>
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

      <label htmlFor="phone">Phone</label>
      <input
        type="text"
        className="form-control"
        id="phone"
        placeholder="Enter phone"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      


    <br/>
    <br/>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={registerHandle}
      >
        Submit
      </button>
      </div>
    </>
  );
};

export default Register;
