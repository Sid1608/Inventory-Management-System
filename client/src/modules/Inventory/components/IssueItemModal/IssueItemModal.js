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

export default function AddItemsModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [issueitem, setIssueItem] = React.useState({
        username: "",
        item_name: ""
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setIssueItem((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const onSubmit = (event) => {
        issueitem.item_name = props.item.item_name;
        axios.post("http://localhost:8080/admin/issueItem", issueitem).then((res) => {
            alert("Issued successfully!");
            console.log(res);
            props.goes(props.item._id);
        });

        setIssueItem({
            username: ""
        });
        handleClose();
        event.preventDefault();
    };

    return (
        <div>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded mx-1"
                style={{ height: "2.5rem" }}
                onClick={handleOpen}>
                Issue Item
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Issue Item
                    </Typography>
                    <form className="w-full grid grid-cols-2 mt-4">
                        <div className='px-1'>
                            <label htmlFor="new" className='label'>Username</label>
                            <div className='w-full flex p-2 password-container'>
                                <input type="text" id="new" className='password' name="username" value={issueitem.username} onChange={handleChange} />
                            </div>
                        </div>
                    </form>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded"
                        onClick={onSubmit}>
                        Issue Item
                    </button>
                </Box>
            </Modal>
        </div>
    );
}