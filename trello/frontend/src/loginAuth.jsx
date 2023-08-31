import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import AllBoard from "./components/Trello/AllBoard";

const LoginAuthuntication = () => {

 if(localStorage.getItem("token") === null ){
     return <Outlet/>
 }
     else{
    return <Navigate to="/AllBoard" replace />;
 }
};

export default LoginAuthuntication 
