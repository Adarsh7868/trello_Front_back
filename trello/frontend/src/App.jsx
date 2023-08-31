import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";  
import Login from "./components/login";
import Register from "./components/register";
// import ContactList from "./components/constactList";
import AuthenticateRoutes from "./AuthRoute";
import LoginAuthuntication from "./loginAuth";
import AllBoard from "./components/Trello/AllBoard";
import BoardId from "./components/Trello/Board_id";

const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<AllBoard />} /> */}
              <Route element={<LoginAuthuntication />}>
                   <Route path="/" element={<Login />} />
              </Route>
             <Route path="/register" element={<Register />} />
              <Route element={<AuthenticateRoutes />} >
                   <Route path="/AllBoard" element={<AllBoard />} />
                   <Route path="/Board/:id" element={<BoardId />} />
              </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
