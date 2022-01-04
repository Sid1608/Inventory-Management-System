import { Switch, Route, Redirect } from "react-router-dom";
import React from 'react'
import OrderItems from './pages/OrderItems/OrderItems'
import OrderHistory from "./pages/OrderHistory/orderhistory"
import Inventory from "./pages/inventory/inventory"
import Orders from "./pages/orders/Orders"
import OrderHistoryAdmin from "./pages/OrderHistoryAdmin/orderhistoryAdmin"
import IssuedItems from "./pages/IssuedItems/IssuedItems"
import Users from './pages/Users/Users'
import Login from "./pages/login/Login"
import Dashboard from "./pages/dashboard/Dashboard";

function App({isLoggedIn, setIsLoggedIn, setIsAdmin, isAdmin}) {

  return (
      <Switch>
        <Route exact path="/inventory">
          {!isLoggedIn && (
            <Redirect to="/inventory/login" />
          )}
        </Route>
        
        <Route path="/inventory/login">
          {!isLoggedIn ? (
            <Login setIsLoggedIn={setIsLoggedIn}
            setIsAdmin = {setIsAdmin} 
             />
          ) : 
              isAdmin ? 
                (<Redirect to = "/inventory/inventory"/>)
              :
                (<Redirect to = "/inventory/dashboard"/>)
              }
        </Route>
        <Route path="/inventory/dashboard">
          {isLoggedIn ? <Dashboard /> : <Redirect to="/inventory/login" />}
        </Route>
        <Route path="/inventory/order-items">
        {isLoggedIn ? <OrderItems /> : <Redirect to="/inventory/login" />}
        </Route>
        <Route path="/inventory/history">
            {isLoggedIn ? <OrderHistory/> : <Redirect to="/inventory/login" />}
        </Route>
        <Route path="/inventory/inventory">
        {isLoggedIn ? <Inventory /> : <Redirect to="/inventory/login" />}
        </Route>
        <Route path="/inventory/orders">
        {isLoggedIn ? <Orders /> : <Redirect to="/inventory/login" />}
        </Route>
        <Route path="/inventory/order-history">
        {isLoggedIn ? <OrderHistoryAdmin /> : <Redirect to="/inventory/login" />}
        </Route>
        <Route path="/inventory/issued-items">
        {isLoggedIn ? <IssuedItems /> : <Redirect to="/inventory/login" />}
        </Route>
        <Route path="/inventory/users">
        {isLoggedIn ? <Users /> : <Redirect to="/inventory/login" />}
        </Route>
        
      </Switch>
  );
}

export default App;
