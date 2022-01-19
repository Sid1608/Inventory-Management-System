import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Dashboard.css"

export default function Dashboard() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getRecentOrder();
  }, [])

  async function getRecentOrder(){
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/user/dashboard/${userId}`);
    console.log(response.data);
    setOrder(response.data.order);
  }

  function date(dateto){
    const date_to_be = new Date(dateto)
    return date_to_be.toDateString()
  }

  function isVerified(status){
    if(status){
      return <span className='order-details'><b>Status:</b> Accepted</span>
    }
    else{
      return <span className='order-details'><b>Status:</b> Pending</span>
    }
  }

  return (
    <div className="main-body">
      <h1>Dashboard</h1>


      <div className="table-responsive">
        {Object.keys(order ?? {}).length > 0 ?
          (<div className="card" style={{padding: '1rem', height: '75vh'}}>
            <b style={{fontSize: "30px", marginBottom: '0.5rem'}}>Recent Order Details</b>
            <br />
            <b style={{fontSize: "24px"}}>{order.remark}</b>
            <br />
            <b style={{fontSize: "24px"}}>Items: </b>
            <br />
            <ul>
              {order.issued_items.map((item, i) => (
                <li  style={{marginLeft: "10px"}}>
                  <b className='order-details'>{i+1}. {item.item_name}</b>
                  <br />

                  <span style={{marginLeft: "20px", fontSize:"16px"}}>ItemCount : {item.item_count}</span>
                  <br />
                  <span style={{marginLeft: "20px", fontSize:"16px"}}>Description : {item.description}</span>
                </li>
              ))}
            </ul>
            <span className='order-details'><b>Order Date:</b> {date(order.order_date)}</span>
            <br />
            <span className='order-details'><b>Total Cost:</b> ₹{order.total_cost}</span>
            <br />
            {isVerified(order.isVerified)}
          </div>) : (<div className="card">
          <h2>No orders found</h2>
          </div>) }
        </div>
    </div>
  )
}