import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default function OrderHistoryDetailsModal({ order }) {
  console.log(order);
  const [open, setOpen] = React.useState(false);
  const [orderData, setOrderData] = React.useState([])
  const [retrieved, setRetrieved] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRetrieved(false)
  }

  if (open && !retrieved) {
    (function (order) {
      console.log(order)
      axios.get("http://localhost:8080/admin/searchOrder/" + order._id).then(res => {
        console.log(res.data)
        const orderDetails = {
          total_items: res.data.item_count,
          items: res.data.issued_items
        }
        setOrderData(orderDetails)
      })
    })(order)
    setRetrieved(true)
  }


  return (
    <div>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded"
        onClick={handleOpen}>
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Total Items: {order.issued_items.length}
            <br />
            Purpose : {order.remark}
            <br />
            <ul>
              {order.issued_items.map((item) => (
                <li>
                  ItemName : {item.item_name} &nbsp;
                  ItemCount :{item.item_count}  &nbsp;
                  Description :{item.description}  &nbsp;
                </li>
              )
              )
              }
            </ul>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}