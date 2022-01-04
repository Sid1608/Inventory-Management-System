import React, {useState, useEffect} from 'react'
import {BrowserRouter} from "react-router-dom"
import "./index.css"
import Sidebar from "./components/sidebar/Sidebar"
import Header from "./components/header/Header"
import Routing from "./Routing"


export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  let className = 'page-container'
  if(!isLoggedIn){
    className += " logged-out-screen"
  }
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true"){
      setIsLoggedIn(true);
      setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")))
    }
  }, []);
  return (
    <BrowserRouter>
    <div className="container-2xl">
      {isLoggedIn && <div  className="sidebar-container">
        <Sidebar
        isAdmin = {isAdmin}></Sidebar>
      </div>}
      <div className="body-container">
        {isLoggedIn && <div className="header-container">
          <Header setIsLoggedIn = {setIsLoggedIn}></Header>
        </div>}
        <div className={className}>
        <Routing
          setIsLoggedIn = {setIsLoggedIn} isLoggedIn = {isLoggedIn}
          setIsAdmin = {setIsAdmin} isAdmin = {isAdmin}></Routing>
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}