import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { WrapperAdmin } from "../layout/admin/index";

const UserPage = () => {
  const [users, setUsers] = useState([]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Level",
      selector: (row) => row.level,
    },
    {
      name: "Action",
      cell: (row) => (
        <button onClick={handleButtonClick} id={row.id} className="btn btn-danger text-white">
          Hapus
        </button>
      ),
    },
  ];

  const handleButtonClick = async (event) => {
     const result = window.confirm("Apakah yakin ingin menghapus data ini?")
     if(result){
      let userId = event.target.id;
      await deleteUser(userId);
     }
   };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/users");
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to handle user deletion
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${id}`,
        {
          method: "DELETE",
        }
      );

      const responseJson = await response.json();
      if (responseJson.success) {
        fetchUsers(); // Refresh user list after deletion
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <WrapperAdmin>
        <div className="col-md-10">
          <div className="dasboard-right">
            <div>
              <h2>Data Pengguna</h2>
              <DataTable columns={columns} data={users} />
            </div>
          </div>
        </div>
      </WrapperAdmin>
    </>
  );
};

export default UserPage;
