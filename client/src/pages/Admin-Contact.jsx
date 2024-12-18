import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllContacts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Contact data:", data); // Log fetched data
      setContactData(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // define the function deleteContactById
  const deleteContactById = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getAllContacts();
        toast.success("Contact deleted successfully");
      }
      const data = await response.json();
      console.log("Users data after deletion:", data);
      
    } catch (error) {
      toast.error("Failed to deleted.");
    }
  }

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contacts</h1>
        <div className="panel admin-users"> 
          {contactData.map((curContactData,index)=>{
            const {username, email, message, _id} = curContactData;
            return(
              <div key={index}>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Message:</strong> {message}</p>
                <button className="btn" onClick={()=>deleteContactById(_id)}>Delete</button>
              </div>
            )
            
          })}
        </div>
      </section>
    </>
  );
};
