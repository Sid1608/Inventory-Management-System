import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid"
import "../../common_styles.css";
import Modal from "../../components/OrderHistoryDetailsModal/OrderHistoryDetailsModal"
import axios from "axios";
import { publicRequest } from "../../axios";

export default function Orderhistory() {

  const [orderHistoryList, setOrderHistoryList] = useState([])



  useEffect(() => {
    const id = localStorage.getItem('userId')
    publicRequest.get(`user/orderHistory/${id}`).then(res => {
      console.log(res.data.orders)
      setOrderHistoryList(res.data.orders)
    })
  }, [])

  function date(dateto) {

    const date_to_be = new Date(dateto)
    return date_to_be.toDateString()

  }

  return (
    <div className="main-body">
      <h1>Order History</h1>
      <div className="content-box">
        <div className="content-box">
          <div style={{ display: 'flex', width: "100%", justifyContent: "center", marginBottom: "2rem" }}>

          </div>
        </div>
        <div className="card">
          {orderHistoryList.length > 0 ? <div className="table-responsive">
            <table className="table table-striped table-sm" style={{ width: "100%", height: "100%" }}>
              <thead className="table__header">
                <tr>
                  <th>Sno</th>
                  <th>Order Date</th>
                  <th>Total Cost</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {orderHistoryList.map((order, i) => (
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
                      {order.isVerified ?
                        (<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Accepted
                        </span>) :
                        (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-red-800">
                            Pending
                          </span>
                        )
                      }
                    </td>
                    <td className="table__actions text-center flex justify-center">
                      <Modal order={order ?? {}} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> : <h2>No Orders found</h2>}
        </div>
      </div>
    </div>
  );
};

