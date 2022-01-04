import React, {useEffect, useState} from "react";
import {SearchIcon} from "@heroicons/react/solid"
import "../../common_styles.css";
import Modal from "../../components/OrderHistoryDetailsModal/OrderHistoryDetailsModal"
import axios from "axios";

 export default function Orderhistory(){

  const [orderHistoryList, setOrderHistoryList] = useState([])



  useEffect(() => {
    const id = localStorage.getItem('userId')
    axios.get("http://localhost:8080/user/orderHistory/" + id).then(res => {
      console.log(res.data.orders)
      setOrderHistoryList(res.data.orders)
    })
  }, [])

  function orderHistory(){
    if(orderHistoryList.length === 0){
      return <h1>No Order History</h1>
    }
    else{
      return (
        <div className="table-responsive">
          <table className="table table-striped table-sm" style={{ width: "100%", height: "100%" }}>
            <thead className="table__header">
              <tr>
                <th>Sno</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {orderHistoryList.map((order, i) => (
                <tr>
                  <td>{i+1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="table__actions text-center flex justify-center">
                    <Modal />
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-black-700 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

  return (
        <div className="main-body">
          <h1>Order History</h1>
          <div className="content-box">
            <div className="content-box">
              <div style={{display: 'flex', width: "100%", justifyContent: "center",marginBottom:"2rem"}}>
                <input className="searchInput" placeholder ="Enter OrderID"/>
                <div className="ml-2">
                  <button type="submit" className="btn btn-primary searchButton">
                    <SearchIcon className="h-4 mr-1"/>
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="card">
              {orderHistory}
            </div>
          </div>
        </div>
  );
};


