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

function OrderDetailsModal({order}) {
    const [open, setOpen] = React.useState(false);
    const [orderData, setOrderData] = React.useState({})
    const [retrieved, setRetrieved] = React.useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setRetrieved(false)
    }
    
    

    if(open && !retrieved ){
        (function(order){
            console.log(order)
            axios.get(`http://localhost:8080/admin/searchOrder/${order._id}`).then(res => {
                console.log(res.data)
                const orderDetails = {
                    order_by: res.data.user_id.name,
                    department: res.data.user_id.department,
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
                Order By: {orderData.order_by}
                <br/>
                Department: {orderData.department}
                <br />
                Total Items: {orderData.total_items}
                <br />
                {/* {orderData.items.map((item) => (
                    <ul>
                        <li>
                            Item
                        </li>
                    </ul>
                ))} */}
            </Box>
        </Modal>
        </div>
    );
}

export default OrderDetailsModal
