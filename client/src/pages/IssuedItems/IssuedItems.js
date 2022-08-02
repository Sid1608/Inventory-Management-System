import React, { useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/solid"
import "../../common_styles.css";
import axios from "axios";
import { publicRequest } from "../../axios";
const IssuedItems = () => {
  const [allIssuedItems, setIssuedItems] = useState([])


  useEffect(() => {
    publicRequest.get("admin/IssuedItems").then(res => {
      console.log(res.data)
      setIssuedItems(res.data)
    })
  }, [])


  function toInventory(item) {
    publicRequest.patch(`admin/toInventory/${item.item_name}`).then(res => {
          alert("Item sent to Inventory");
        }).catch(error => {
          alert("error");
          console.log(error);
        })

        publicRequest.delete(`admin/deleteIssuedItem/${item._id}`).then(res => {
          console.log("issued item deleted");
        }).catch(err => {
          console.log(err);
        })
        
        setIssuedItems((previtems) => {
          return previtems.filter((items) => {
            return item._id != items._id;
          });
        });
  }


  return (
    <div className="main-body">
      <h1>Issued Items</h1>
      <div className="content-box">
        <div style={{ display: 'flex', width: "100%", justifyContent: "center", marginBottom: "2rem" }}>
        </div>
        <div className="card">
          <div className="table-responsive">
            <table className="table table-striped table-sm" style={{ width: "100%", height: "100%" }}>
              <thead className="table__header">
                <tr>
                  <th>Sno</th>
                  <th>Item Name</th>
                  <th>Username</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {allIssuedItems.length > 0 ? allIssuedItems.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item.item_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item.username}
                      </span>
                    </td>
                    <td className="table__actions text-center"
                      style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                      <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => { toInventory(item) }}>
                        To Inventory
                      </button>
                    </td>
                  </tr>
                )) : <h2>No Issued Items</h2>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuedItems;

