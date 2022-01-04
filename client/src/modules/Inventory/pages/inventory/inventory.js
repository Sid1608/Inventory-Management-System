import React, { useState, useEffect } from "react";
import "../../common_styles.css";
import { SearchIcon } from "@heroicons/react/solid"
import Modal from "../../components/AddItemsModal/AddItemsModal"
import "./Inventory.css"
import axios from "axios";


const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/inventory").then(res => {
      setInventoryData(res.data.items)
      console.log(res.data)
    })
  }, [])

  function go(item) {
    //const { name, value } = event.target;
    setInventoryData((prev) => {
      return [...prev, item];
    });
  }
  async function handleChange(event) {
    try {
      axios.get(`http://localhost:8080/admin/${event.target.value}`).then(res => {
        var inventoryItems = res.data.items
        setInventoryData(inventoryItems)
        console.log(inventoryItems)
      })
    } catch (error) {
      console.log(error)
    }
  }


  function returnAllInventoryData(inventoryData) {
    if (!inventoryData) {
      return <h1>No Items Present</h1>
    }
    else {
      return inventoryData.map((item, i) => (
        <tr key={item._id}>
          <td>{i + 1}</td>
          <td>{item.item_name}</td>
          <td>{item.item_description}</td>
          <td>{item.item_count}</td>
        </tr>
      ))
    }
  }

  function searchByName() {
    let x = document.getElementById("item").value;

    axios.get(`http://localhost:8080/admin/searchItem/${x}`)
      .then(response => setInventoryData(response.data))
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="main-body">
      <h1>Inventory</h1>
      <div className="content-box">
        <div style={{ display: 'flex', width: "100%", justifyContent: "center", marginBottom: "2rem" }}>
          <div>
            <input className="searchInput" placeholder="Enter Item Name(exact same)" id="item" />
          </div>
          <div className="ml-2" style={{ display: "flex" }}>
            <button type="submit" className="btn btn-primary searchButton" onClick={searchByName}>
              <SearchIcon className="h-4 mr-1" />
              Search
            </button>
          </div>
          <div className="sortItems">
            <select name="itemAge" onChange={handleChange}>
              <option value='inventory' default
              >All Items</option>
              <option value='fsn1'
              >More than 5 years</option>
              <option value='fsn2'
              >More than 10 years</option>
              <option value='C'
              >C Items/Cheap Items</option>
              <option value='B'
              >B Items/Mid Ranged Items</option>
              <option value='A'
              >A Items/Expensive Items</option>
            </select>
          </div>
          <Modal go={go} />
        </div>
        <div className="card">
          <div className="table-responsive">
            {inventoryData?.length > 0 ?
              <table className="table table-striped" style={{ width: "100%", height: "100%" }}>

                <thead className="table__header">
                  <tr>
                    <th>Sno</th>
                    <th>Item Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                  </tr>
                </thead>

                <tbody className="table__body">
                  {returnAllInventoryData(inventoryData)}
                </tbody>
              </table> : <h1>No items found</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

