import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from "../../components/OrderHistoryDetailsModal/OrderHistoryDetailsModal"

export default function Dashboard() {
  const [order, setOrder] = useState(null);

  useEffect(async () => {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/user/dashboard/${userId}`);
    console.log(response.data);
    setOrder(response.data.order);
  }, [])

  function date(dateto){

    const date_to_be = new Date(dateto)
    return date_to_be.toDateString()

  }

  return (
    <div className="main-body">
      <h1>Dashboard</h1>


      <div className="table-responsive">
        {Object.keys(order ?? {}).length > 0 ?
          (<div className="card">
            <h2>Recent Order Details</h2>
            <table className="table table-striped table-sm" style={{ width: "100%", height: "100%" }}>
              <thead className="table__header">
                <tr>
                  <th>Sno</th>
                  <th>Order Date</th>
                  <th>Total Cost</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="table__body">

                <tr key={order._id}>
                  <td>{1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      { date(order.order_date) }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {order.total_cost}
                    </span>
                  </td>
                  <td>
                    <Modal order = {order} />
                  </td>
                </tr>
              </tbody>
            </table> 
          </div>) : (<div className="card">
          <h2>No orders found</h2>
          </div>) }
        </div>
    </div>
  )
}