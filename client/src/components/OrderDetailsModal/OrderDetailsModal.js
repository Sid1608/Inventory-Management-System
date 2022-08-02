import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { publicRequest } from "../../axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function OrderDetailsModal({ order }) {
  const [open, setOpen] = React.useState(false);
  const [orderData, setOrderData] = React.useState({});
  const [retrieved, setRetrieved] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRetrieved(false);
  };

  if (open && !retrieved) {
    console.log(order);
    publicRequest
      .get("admin/searchOrder/" + order._id)
      .then((res) => {
        console.log(res.data.order);
        setOrderData(res.data.order);
        console.log(orderData);
        setRetrieved(true);
      });
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        Details
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order Details
          </Typography>
          {Object.entries(orderData).length === 0 &&
          orderData.constructor === Object ? (
            <h2> Hello </h2>
          ) : (
            <>
              Order By: {orderData.user_id.name}
              <br />
              Department: {orderData.user_id.department}
              <br />
              Total Items: {orderData.item_count}
              <br />
              Purpose : {orderData.remark}
              <br />
              <ul>
                {order.issued_items.map((item) => (
                  <li>
                    ItemName : {item.item_name} &nbsp; 
                    ItemCount :{item.item_count} &nbsp; 
                    Description :{item.description}{" "}&nbsp;
                  </li>
                ))}
              </ul>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default OrderDetailsModal;
