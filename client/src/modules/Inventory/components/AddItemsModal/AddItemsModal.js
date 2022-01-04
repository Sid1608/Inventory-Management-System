import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./AddItemsModal.css";
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

export default function AddItemsModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [item, setItem] = React.useState({
    item_name: "",
    item_description: "",
    expected_cost: 0,
    item_count: 0,
  });


  const handleChange = (event) => {
    //destructuring
    const { name, value } = event.target;
    setItem((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = (event) => {
    /*const newItem = {
      item_name: item.item_name,
      item_description: item.item_description,
      expected_cost: item.expected_cost,
      item_count: item.item_count,
    };*/
    axios.post("http://localhost:8080/admin/addItem", item).then((res) => {
      console.log(res);
      props.go(res.data.item);
    });
    //props.go(n);
    setItem({
      item_name: "",
      item_description: "",
      expected_cost: 0,
      item_count: 0,
    });
    handleClose();
    event.preventDefault();
  };

  return (
    <div>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded mx-1"
        style={{ height: "2.5rem" }}
        onClick={handleOpen}>
        Add Items
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Items
          </Typography>
          <form className="w-full grid grid-cols-2 mt-4">
            <div className='px-1'>
              <label htmlFor="new" className='label'>Item Name</label>
              <div className='w-full flex p-2 password-container'>
                <input type="text" id="new" className='password' name="item_name" value={item.item_name} onChange={handleChange} />
              </div>
            </div>
            <div className='px-1'>
              <label htmlFor="current" className='label'>Description</label>
              <div className='w-full flex p-2 password-container'>
                <input type="text" id="current" className='password' name="item_description" value={item.item_description} onChange={handleChange} />
              </div>
            </div>
            <div className='px-1'>
              <label htmlFor="new" className='label'>Cost</label>
              <div className='w-full flex p-2 password-container'>
                <input type="text" id="new" className='password' name="expected_cost" value={item.expected_cost} onChange={handleChange} />
              </div>
            </div>
            <div className='px-1'>
              <label htmlFor="current" className='label'>Quantity</label>
              <div className='w-full flex p-2 password-container'>
                <input type="text" id="current" className='password' name="item_count" value={item.item_count} onChange={handleChange} />
              </div>
            </div>
          </form>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded"
            onClick={onSubmit}>
            Add Item
          </button>
        </Box>
      </Modal>
    </div>
  );
}