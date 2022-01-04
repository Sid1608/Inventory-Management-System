import React from "react";
import { SearchIcon } from "@heroicons/react/solid"
import Modal from "../../components/OrderHistoryDetailsModal/OrderHistoryDetailsModal";
import "../../common_styles.css";

const orderhistoryAdmin = () => {
  const orders = [
    {
      id: 1,
      orderId: "CSE001",
      orderDate: "21/12/2021",
      TotalCost: 46800,
      Status: "Sent"
    },
    {
      id: 2,
      orderId: "CSE002",
      orderDate: "19/11/2021",
      TotalCost: 90560,
      Status: "Not Sent"
    },
    {
      id: 2,
      orderId: "CSE003",
      orderDate: "28/9/2021",
      TotalCost: 76500,
      Status: "Sent"
    },
  ]

  const status = (order) => {
    if(order.Status === "Sent"){
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {order.Status}
      </span>
    }
    else{
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
        {order.Status}
      </span>
    }
  }

  return (
    <div className="main-body">
      <h1>Order History</h1>
      <div className="content-box">
      <div style={{display: 'flex', width: "100%", justifyContent: "center",marginBottom:"2rem"}}>
              <div>
                <input className="searchInput" placeholder ="Enter ItemID"/>
              </div>
              <div className="ml-2">
                <button type="submit" className="btn btn-primary searchButton">
                  <SearchIcon className="h-4 mr-1"/>
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
                <th>OrderID</th>
                <th>OrderDate</th>
                <th>TotalCost</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {orders.map((order) => (
                <tr>
                <td>{order.id}</td>
                <td>{order.orderId}</td>
                <td>{order.orderDate}</td>
                <td>{order.TotalCost}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {order.Status}
                  </span> */}

                  {status(order)}
                </td>
                <td className="table__actions text-center">
                  <Modal />
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
};

export default orderhistoryAdmin;
