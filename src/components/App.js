import '../css/tailwind.css';
import Nav from './Nav';
import Home from './public/Homepage'
import Feed from './private/Feed';
import Login from './public/Login';
import Register from './public/Register';
import PlayList from './private/PlayList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";

function App() {
  const [isAuth, setAuth] = useState(false)

  // const display = () =>{
  //   if(isAuth){
  //     return <Route path = "/" element = {<Home/>} />
  //   }
  //   else{
  //     return <Private />
  //   }
  // }

  return (
    <React.StrictMode>
      <Router>
        <Nav />
        <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/playlist" element={<PlayList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
