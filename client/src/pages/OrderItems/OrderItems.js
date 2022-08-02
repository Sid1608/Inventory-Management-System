import React, { useState ,useEffect} from 'react'
import "../../common_styles.css";
import "./OrderItems.css"
import axios from "axios";
import { publicRequest } from '../../axios';
export default function OrderItems() {

    const [rows, setRows] = useState([]);
    const [userId,setUserId]=useState(null);
    const [purpose,setPurpose]=useState("");

    //Getting User Details
      useEffect(() => {
        console.log(rows.length)
        setUserId(window.localStorage.getItem('userId'))
        console.log(userId)
      },[])

      //add row
      function addRows() {
        setRows([...rows, {
          item_name: "",
          item_count:0,
          description: "",
          expected_cost: 0,
        }]);
      }
      //delete Row
      function deleteLastRow() {
        setRows(oldRows => {
          const newRows = [...oldRows];
          newRows.pop();
          return newRows;
        });
      }

      //Placing Order
      function PlaceOrder(){
        let idx=0;
        let totalCost=0;
        for(idx=0;idx<rows.length;idx++){
          totalCost+=parseInt(rows[idx]["expected_cost"]);
        }
        publicRequest.post("user/orderItem",{
          user_id:userId,
          item_count:rows.length,
          remark:purpose,
          total_cost:totalCost,
          issued_items:rows,
        })
        .then(response => {
          alert("Order placed successfully");
          setRows([]);
          setPurpose("");
        })
        .catch(error => {
            console.log(error);
        });
      }
      const handleChange = (event, idx) => {
        setRows(oldRows => {
          const newRows = [...oldRows];
          newRows[idx][event.target.name] = event.target.value;
          return newRows;
        });

        console.log(rows[idx]["item_name"]); // Like this we can access the particular column of the idxth row
      }

  return (
    <div className="container p-4">
      <div>
        <h1>Order Items</h1>
        <div className="content-box">
          <div className="order-card">
            <div className="table-responsive">
              <table className="table table-striped table-sm" style={{ width: "100%", height: "100%" }}>
                <thead className="table__header">
                  <tr>
                    <th>Sno</th>
                    <th>Item Name</th>
                    <th>Expected Cost</th>
                    <th>Quantity</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody className="table__body">
                  {rows.map((r, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td className="address-box"><input type="text" placeholder="abc" onChange={(event) => handleChange(event, idx)} name="item_name" value={r["item_name"]} /></td>
                      <td><input type="number" size="20" placeholder="4500" onChange={(event) => handleChange(event, idx)} name="expected_cost" value={r["expected_cost"]} /></td>
                      <td><input type="number" size="20" placeholder="3" onChange={(event) => handleChange(event, idx)} name="item_count" value={r["item_count"]} /></td>
                      <td><input type="text" size="60" placeholder="Additional Info" onChange={(event) => handleChange(event, idx)} name="description" value={r["description"]} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded"
              onClick={addRows}>
              Add Item
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded ml-2"
              onClick={deleteLastRow}>
              Delete Last Item
            </button>
          </div>
          <div>
            <label><h2>Purpose</h2></label>
            <textarea rows="5" className="w-full purpose"></textarea>
          </div>
          <button  onClick={PlaceOrder} className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded"><h2>Place Order</h2></button>
        </div>
      </div>
    </div>
  );
}




