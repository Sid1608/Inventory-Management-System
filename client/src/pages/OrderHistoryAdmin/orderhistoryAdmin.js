import React, { useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import Modal from "../../components/OrderDetailsModal/OrderDetailsModal";
import "../../common_styles.css";
import axios from "axios";
import { publicRequest } from "../../axios";

export default function OrderHistoryAdmin() {
  const [orderHistoryAdminList, setOrderHistoryAdminList] = useState([]);

  useEffect(() => {
    publicRequest.get("admin/orders").then((res) => {
      console.log(res.data.orders);
      setOrderHistoryAdminList(res.data.orders);
    });
  }, []);

  function date(dateto) {
    const date_to_be = new Date(dateto);
    return date_to_be.toDateString();
  }

  function searchByDate() {
    let x = document.getElementById("date").value;

    publicRequest
      .get(`admin/searchByOrderDate/${x}`)
      .then((response) => setOrderHistoryAdminList(response.data))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="main-body">
      <h1>Order History</h1>
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
            <input
              className="searchInput"
              placeholder="Enter Order Date"
              id="date"
            />
          </div>
          <div className="ml-2">
            <button
              type="submit"
              className="btn btn-primary searchButton"
              onClick={searchByDate}
            >
              <SearchIcon className="h-4 mr-1" />
              Search
            </button>
          </div>
        </div>
        <div className="card">
          {orderHistoryAdminList.length > 0 ? (
            <div className="table-responsive">
              <table
                className="table table-striped table-sm"
                style={{ width: "100%", height: "100%" }}
              >
                <thead className="table__header">
                  <tr>
                    <th>Sno</th>
                    <th>OrderDate</th>
                    <th>TotalCost</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="table__body">
                  {orderHistoryAdminList.map((order, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {date(order.order_date)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-white-800">
                          {order.total_cost}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.isVerified ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Sent
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Not Sent
                          </span>
                        )}
                      </td>
                      <td className="table__actions text-center">
                        <Modal order={order} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2> No Orders found </h2>
          )}
        </div>
      </div>
    </div>
  );
}
