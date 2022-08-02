import React, { useState, useEffect } from "react";
import "../../common_styles.css";
import DeleteUserModal from "../../components/DeleteUserModal/DeleteUserModal";
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";
import AddUserModal from "../../components/AddUserModal/AddUserModal"
import { publicRequest } from "../../axios";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);

  
 //getting all users details
  useEffect(() => {
    async function getAllUsers() {
      publicRequest
        .get("admin/users")
        .then((res) => {
          setAllUsers(res.data.users);
          console.log(res.data.users);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getAllUsers();
  }, []);


  //adding new user to the state 
  function addUser(newUser) {
    setAllUsers((prevUsers) => {
      return [...prevUsers, newUser];
    });
  }
   
  //deleting user from the state
  function deleteUser(userNamefromProps) {
    setAllUsers((prevUsers) => {
      return prevUsers.filter((user) => {
        return user.username !== userNamefromProps;
      });
    });
  }

  //for changing user password in the state
  function passwordChange(passwordFromprops) {
    setAllUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.password === passwordFromprops ? { ...user, password: passwordFromprops } : user
      );
    });
  }

  const notDeletion = (user) => {
    if (user.username !== "admin") {
      return <DeleteUserModal username={user.username} onDelete={deleteUser} />;
    }
  };

  return (
    <div className="main-body">
      <h1>Users</h1>
      <div className="content-box">
        <div className="card">
          <div className="table-responsive">
            <table
              className="table table-striped table-sm"
              style={{ width: "100%", height: "100%" }}
            >
              <thead className="table__header">
                <tr>
                  <th style={{ marginLeft: "100px" }}>S.no</th>
                  <th style={{ marginLeft: "100px" }}>Username</th>
                  <th style={{ marginLeft: "100px" }}>Name</th>
                  <th style={{ marginLeft: "100px" }} className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="table__body">
                {allUsers.map((user, i) => (
                  <tr>
                    <td style={{ marginLeft: "100px" }}>{i + 1}</td>
                    <td style={{ marginLeft: "100px" }}>{user.username}</td>
                    <td style={{ marginLeft: "100px" }}>
                      <span className="badge badge-warning text-uppercase">
                        {user.name}
                      </span>
                    </td>
                    <td
                      style={{ display: "flex", justifyContent: "center" }}
                      className="table__actions text-center"
                      data-item-id="<%= user.id %>"
                    >
                      <ChangePasswordModal
                        username={user.username}
                        department={user.department}
                        name={user.name}
                        onChange={passwordChange}
                      />
                      {notDeletion(user)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <br />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "30px" }}>
        <AddUserModal onAdd={addUser} />
      </div>
    </div>
  );
};

export default Users;
