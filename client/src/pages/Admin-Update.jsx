import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const { id } = useParams();
  const { authorizationToken } = useAuth();
  const [loading, setLoading] = useState(false);

  // Fetch user data to prefill the form
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      toast.error("An error occurred while fetching user details.");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/update/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Updated Successfully");
      } else {
        toast.error("Failed to update the user.");
      }
    } catch (err) {
      toast.error("An error occurred while updating user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update User Details</h1>
      </div>

      <div className="container grid grid-two-cols">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInput}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInput}
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInput}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="update-btn">
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminUpdate;
