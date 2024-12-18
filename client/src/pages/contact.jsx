import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContactForm = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [contact, setContact] = useState(defaultContactForm);
  const { user } = useAuth();

  // Initialize form with user data when component mounts
  useEffect(() => {
    if (user) {
      setContact((prevContact) => ({
        ...prevContact,
        username: user.userData.username,
        email: user.userData.email,
      }));
    }
  }, [user]); // Dependency ensures this runs when `user` changes

  // Handle input changes
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contact);
    try {
      const response = await fetch(`http://localhost:5000/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact((prevContact) => ({
          ...prevContact,
          message: "", // Reset only the message field
        }));
        const data = await response.json();
        console.log(data);
        toast.success("Message sent successfully");
      }
    } catch (error) {
      toast.error("Message not sent");
      console.log("Not able to deliver message");
    }
  };

  return (
    <>
      <section className="section-contact">
        {/* Contact page main */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img
              src="/images/images/support.png"
              alt="we are always ready to help"
            />
          </div>

          {/* Contact form content actual */}
          <section className="section-form">
            <h1 className="main-heading contact-heading">Contact Form</h1>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                  className="username-input"
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit" className="btn btn-submit">
                  Contact Now
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};
