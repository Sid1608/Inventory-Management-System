import React from "react";
import {SearchIcon} from "@heroicons/react/solid"
import "../../common_styles.css";
const IssuedItems = () => {

  
  return (
    <div className="main-body">
    <h1>Issued Items</h1>
      <div className="content-box">
       <div style={{display: 'flex', width: "100%", justifyContent: "center",marginBottom:"2rem"}}>
          <div>
            <input className="searchInput"/>
          </div>
          <div className="ml-2">
            <button type="submit" className="btn btn-primary mr-2 searchButton">
              <SearchIcon className="h-4 mr-1"/>
              Search
            </button>
          </div>
       </div>
        <div className="card">
        <div className="table-responsive">
          <table className="table table-striped table-sm" style={{ width: "100%", height: "100%" }}>
            <thead className="table__header">
              <tr>
                <th>Sno</th>
                <th>Item Id</th>
                <th>Item Name</th>
                
                <th>Description</th>
                <th>Quantity</th>
                <th className="text-center">Actions</th>
               
              </tr>
            </thead>
            <tbody className="table__body">
              <tr>
                <td>abc</td>
                <td>8824885175</td>
                <td className="address-box">abc</td>
                <td>2000</td>
                <td>
                  <strong className="text-success"></strong>
                  <small className="text-muted p-0 font-weight-bold">
                  </small>
                </td>

                <td
                  className="table__actions text-center"
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                  To Inventory
                </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default IssuedItems;


