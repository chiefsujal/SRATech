import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";  // Optional, for error handling

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null); // Changed to null
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  // Function to store token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token; // Determines if user is logged in

  // Handle logout functionality
  const LogoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  // JWT AUTHENTICATION - Fetch currently logged-in user data
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        toast.error("Failed to fetch user data.");
        LogoutUser();
      }
    } catch (error) {
      console.error("Error fetching details:", error);
      toast.error("Error fetching user details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch services from the database
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const services = await response.json();
        setServices(services.msg);
      }
    } catch (error) {
      console.error("Services failed to import from db:", error);
    }
  };

  useEffect(() => {
    getServices();
    if (token) {
      userAuthentication();
    } else {
      setUser(null); // Clear user if no token
    }
  }, [token]); // Run when token changes

  return (
    <AuthContext.Provider value={{
      isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
