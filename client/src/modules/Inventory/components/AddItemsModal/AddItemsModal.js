import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./AddItemsModal.css"
import axios from "axios"

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

export default function AddItemsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [item, setItem] = React.useState({
    item_name: "",
    expected_cost:0,
    item_count: 1,
    item_description: "",
  });

  const handleChange = (event) => {
    //destructuring
    const { name, value } = event.target;
    setItem((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const addItem=(event)=>{
    axios.post("http://localhost:8080/admin/addItem",item).then(response=>{
      alert("item added successfully");
      setOpen(false)
      console.log(response)
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <div>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded mx-1"
        style={{height: "2.5rem"}}
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
                        <input type="text" name="item_name" id="new" className='password'/>
                    </div>
                </div>
                <div className='px-1'>
                    <label htmlFor="current" className='label'>Description</label>
                    <div className='w-full flex p-2 password-container'>
                        <input type="text" name="item_description" id="current" className='password'/>
                    </div>
                </div>
                <div className='px-1'>
                    <label htmlFor="new" className='label'>Cost</label>
                    <div className='w-full flex p-2 password-container'>
                        <input type="text" name="expected_cost" id="new" className='password'/>
                    </div>
                </div>
                <div className='px-1'>
                    <label htmlFor="current" className='label'>Quantity</label>
                    <div className='w-full flex p-2 password-container'>
                        <input type="text" name="item_count" id="current" className='password'/>
                    </div>
                </div>
            </form>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded"
                onClick={addItem}>
                    Add Item
            </button>
        </Box>
      </Modal>
    </div>
  );
}