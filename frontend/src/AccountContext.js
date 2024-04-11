import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: null,
    email: null,
    token: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the JWT token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      console.log('no token')
      // If no token is found, set the user as not logged in
      setUser({ loggedIn: false });
    } else {
      // Use the token to fetch user data from the server
      fetch("http://localhost:4000/secure-route/Login", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Set the user data received from the server
        setUser({ loggedIn: true, token: data.token, email: data.email });
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error cases, e.g., token is invalid or expired
        localStorage.removeItem("token"); // Consider removing the invalid token
      });
    }
  }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
