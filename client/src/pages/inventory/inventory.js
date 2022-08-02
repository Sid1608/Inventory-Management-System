import React, { useState, useEffect } from "react";
import "../../common_styles.css";
import { SearchIcon } from "@heroicons/react/solid";
import Modal from "../../components/AddItemsModal/AddItemsModal";
import Modals from "../../components/IssueItemModal/IssueItemModal";
import "./Inventory.css";
import { publicRequest } from "../../axios";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    publicRequest.get("admin/inventory").then((res) => {
      setInventoryData(res.data.items);
      console.log(res.data);
    });
  }, []);

  function go(item) {
    setInventoryData((prev) => {
      return [...prev, item];
    });
  }

  function goes(item_id) {
    publicRequest
      .patch(`admin/issuedDecreaser/${item_id}`)
      .then((res) => {
        setInventoryData((prevItems) => {
          let newItem = prevItems.map((item) =>
            item_id === item._id
              ? { ...item, issued_count: item.issued_count + 1 }
              : item
          );

          return newItem.filter(
            (item) => item.item_count - item.issued_count > 0
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleChange(event) {
    try {
      publicRequest
        .get(`admin/${event.target.value}`)
        .then((res) => {
          var inventoryItems = res.data.items;
          setInventoryData(inventoryItems);
          console.log(inventoryItems);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function searchByName() {
    let x = document.getElementById("item").value;

    publicRequest
      .get(`admin/searchItem/${x}`)
      .then((response) => setInventoryData(response.data))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="main-body">
      <h1>Inventory</h1>
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
              placeholder="Enter Item Name(exact same)"
              id="item"
            />
          </div>
          <div className="ml-2" style={{ display: "flex" }}>
            <button
              type="submit"
              className="btn btn-primary searchButton"
              onClick={searchByName}
            >
              <SearchIcon className="h-4 mr-1" />
              Search
            </button>
          </div>
          <div className="sortItems">
            <select name="itemAge" onChange={handleChange}>
              <option value="inventory" default>
                All Items
              </option>
              <option value="fsn1">More than 5 years</option>
              <option value="fsn2">More than 10 years</option>
              <option value="C">C Items/Cheap Items</option>
              <option value="B">B Items/Mid Ranged Items</option>
              <option value="A">A Items/Expensive Items</option>
            </select>
          </div>
          <Modal go={go} />
        </div>
        <div className="card">
          <div className="table-responsive">
            {inventoryData.length > 0 ? (
              <table
                className="table table-striped"
                style={{ width: "100%", height: "100%" }}
              >
                <thead className="table__header">
                  <tr>
                    <th>Sno</th>
                    <th>Item Name</th>
                    <th>Item Cost</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Available</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="table__body">
                  {inventoryData.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.item_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.expected_cost}
                        </span>
                      </td>
                      <td>{item.item_description}</td>
                      <td>{item.item_count}</td>
                      <td>{item.item_count - item.issued_count}</td>
                      <td
                        className="table__actions text-center"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Modals item={item} goes={goes} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h2>No items found</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
