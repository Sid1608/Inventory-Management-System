import React, { useState, useEffect } from "react";
import "../../common_styles.css";
import { SearchIcon } from "@heroicons/react/solid";
import Modal from "../../components/OrderDetailsModal/OrderDetailsModal";
import  { publicRequest } from "../../axios";

function Orders() {
  const [allOrders, getAllOrders] = useState([]);

  useEffect(() => {
    publicRequest.get("admin/orders").then((res) => {
      console.log(res.data.orders);
      getAllOrders(res.data.orders);
    });
  }, []);

  //for accepting orders
  const AcceptOrder=async (order_id)=>{
    try{

    
    const res=await publicRequest.patch(`admin/acceptOrder/${order_id}`)
      // .then((res) => {
        console.log(res.data.orders);
        alert("Order Accepted!");

        //after order has been accepted changing the state
        getAllOrders((prevOrders) => {
          return prevOrders.map((order) =>
            order_id === order._id ? { ...order, isVerified: true } : order
          );
        });
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    }catch(error){
      console.log(error);
    }
  }

  const  RejectOrder=async(order_id)=>{
    try{

    
      const res=await publicRequest.delete(`admin/rejectOrder/${order_id}`)
      console.log(res.data.orders);
      alert("Order Rejected!");
      getAllOrders((prevOrders) => {
        return prevOrders.filter((order) => {
          return order._id !== order_id;
        });
      });
    }catch(error){
      console.log(error);
    }
      
  }
  function date(dateto) {
    const date_to_be = new Date(dateto);
    return date_to_be.toDateString();
  }

  return (
    <div className="main-body">
      <h1>Orders</h1>
      <div className="content-box">
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <input className="searchInput" placeholder="Enter OrderID" />
          </div>
          <div className="ml-2">
            <button type="submit" className="btn btn-primary searchButton">
              <SearchIcon className="h-4 mr-1" />
              Search
            </button>
          </div>
        </div>
        <div className="card">
          <div className="table-responsive">
            <table
              className="table table-striped table-sm"
              style={{ width: "100%", height: "100%" }}
            >
              <thead className="table__header">
                <tr>
                  <th>Sno</th>
                  <th>Order Date</th>
                  <th>Total Cost</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {allOrders.map((order, i) => (
                  <tr key={order._id}>
                    <td>{i + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {date(order.order_date)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {order.total_cost}
                      </span>
                    </td>
                    <td
                      className="table__actions text-center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Modal order={order} />
                      {!order.isVerified && (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded"
                            onClick={() => {
                              AcceptOrder(order._id);
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                              RejectOrder(order._id);
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
