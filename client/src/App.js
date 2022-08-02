import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import OrderItems from "./pages/OrderItems/OrderItems";
import OrderHistory from "./pages/OrderHistory/orderhistory";
import Inventory from "./pages/inventory/inventory";
import Orders from "./pages/orders/Orders";
import OrderHistoryAdmin from "./pages/OrderHistoryAdmin/orderhistoryAdmin";
import IssuedItems from "./pages/IssuedItems/IssuedItems";
import Users from "./pages/Users/Users";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Home from './Home'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  let className = "page-container";
  if (!isLoggedIn) {
    className += " logged-out-screen";
  }
  useEffect(() => {
      var hours = 2; // to clear the localStorage after 1 hour
                // (if someone want to clear after 8hrs simply change hours=8)
      var now = new Date().getTime();
      var setupTime = localStorage.getItem('setupTime');
      if (setupTime == null) {
          localStorage.setItem('setupTime', now)
      } else {
          if(now-setupTime > hours*60*60*1000) {
              localStorage.clear()
              localStorage.setItem('setupTime', now);
          }
      }
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
      setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="container-2xl">
        {isLoggedIn && (
          <div className="sidebar-container">
            <Sidebar isAdmin={isAdmin}></Sidebar>
          </div>
        )}
        <div className="body-container">
          {isLoggedIn && (
            <div className="header-container">
              <Header setIsLoggedIn={setIsLoggedIn}></Header>
            </div>
          )}
          <div className={className}>
            <Switch>
              {/* auth routes */}
              <Route exact path="/">
                <Home/>
              </Route>

              <Route exact path="/inventory">
                {!isLoggedIn && <Redirect to="/inventory/login" />}
              </Route>

              <Route path="/inventory/login">
                {!isLoggedIn ? (
                  <Login
                    setIsLoggedIn={setIsLoggedIn}
                    setIsAdmin={setIsAdmin}
                  />
                ) : isAdmin ? (
                  <Redirect to="/inventory/inventory" />
                ) : (
                  <Redirect to="/inventory/dashboard" />
                )}
              </Route>

              {/* Users Route */}
              <Route path="/inventory/dashboard">
                {isLoggedIn ? (
                  <Dashboard />
                ) : (
                  <Redirect to="/inventory/login" />
                )}
              </Route>
              <Route path="/inventory/order-items">
                {isLoggedIn ? (
                  <OrderItems />
                ) : (
                  <Redirect to="/inventory/login" />
                )}
              </Route>
              <Route path="/inventory/history">
                {isLoggedIn ? (
                  <OrderHistory />
                ) : (
                  <Redirect to="/inventory/login" />
                )}
              </Route>

              {/* Admin Routes */}
              <Route path="/inventory/inventory">
                {isLoggedIn ? (
                  <Inventory />
                ) : (
                  <Redirect to="/inventory/login" />
                )}
              </Route>
              <Route path="/inventory/orders">
                {isLoggedIn ? <Orders /> : <Redirect to="/inventory/login" />}
              </Route>
              <Route path="/inventory/order-history">
                {isLoggedIn ? (
                  <OrderHistoryAdmin />
                ) : (
                  <Redirect to="/inventory/login" />
                )}
              </Route>
              <Route path="/inventory/issued-items">
                {isLoggedIn ? (
                  <IssuedItems />
                ) : (
                  <Redirect to="/inventory/login" />
                )}
              </Route>
              <Route path="/inventory/users">
                {isLoggedIn ? <Users /> : <Redirect to="/inventory/login" />}
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
