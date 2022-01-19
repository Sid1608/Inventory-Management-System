import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

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

export default function AddUserModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    department: "",
    name: "",
  });

  const handleChange = (event) => {
    //destructuring
    const { name, value } = event.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = (event) => {
    const newUser = {
      username: user.username,
      password: user.password,
      department: user.department,
      name: user.name,
    };
    axios.post("http://localhost:8080/auth/register", newUser).then((res) => {
      console.log(res);
    });
    props.onAdd(newUser);
    setUser({
      username: "",
      password: "",
      department: "",
      name: "",
    });
    handleClose();
    event.preventDefault();
  };

  return (
    <div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded mx-1"
        style={({ height: "10rem", length: "10px" }, { float: "right" })}
        onClick={handleOpen}
      >
        Add User
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add User
          </Typography>
          <form className="w-full grid grid-cols-2 mt-4">
            <div className="px-1">
              <label htmlFor="new" className="label">
                Username
              </label>
              <div className="w-full flex p-2 password-container">
                <input
                  name="username"
                  onChange={handleChange}
                  type="text"
                  id="new"
                  className="password"
                  value={user.username}
                />
              </div>
            </div>
            <div className="px-1">
              <label htmlFor="current" className="label">
                Password
              </label>
              <div className="w-full flex p-2 password-container">
                <input
                  name="password"
                  onChange={handleChange}
                  type="text"
                  id="current"
                  className="password"
                  value={user.password}
                />
              </div>
            </div>
            <div className="px-1">
              <label htmlFor="new" className="label">
                Department
              </label>
              <div className="w-full flex p-2 password-container">
                <input
                  name="department"
                  onChange={handleChange}
                  type="text"
                  id="new"
                  className="password"
                  value={user.department}
                />
              </div>
            </div>
            <div className="px-1">
              <label htmlFor="current" className="label">
                Name
              </label>
              <div className="w-full flex p-2 password-container">
                <input
                  name="name"
                  onChange={handleChange}
                  type="text"
                  id="current"
                  className="password"
                  value={user.name}
                />
              </div>
            </div>
          </form>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-black-700 rounded"
            onClick={onSubmit}
          >
            Add User
          </button>
        </Box>
      </Modal>
    </div>
  );
}
