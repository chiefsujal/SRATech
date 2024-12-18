import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
  const[users,setUsers]=useState([]);
  const { authorizationToken } = useAuth();

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Users data:", data);
      setUsers(data);
      
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // delete the user on delete button
  const deleteUser = async(id) => {
    
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getAllUsers();
      }
      const data = await response.json();
      console.log("Users data after deletion:", data);
    } catch (error) {
      console.log("Error", error);
    } 
  
  };
  
  useEffect(() => {
    getAllUsers();
  }, []); // Ensure this runs only once when the component mounts

  return (
    <> 
      <section className="admin-users-section">
        <div className="heading123">
          <h1>Admin Users Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser,index) => {
                return <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td><Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>

                    <td><button onClick={()=>deleteUser(curUser._id)}>
                    Delete                  
                    </button></td>
                </tr>
              })}
            </tbody>
          </table>
        
      </div>
      </section>
  </>
  );
};
