/* eslint-disable no-unused-vars */
import { useState } from "react";

const useToken = () => {
    
    const [token, setToken] = useState(null)

    const getTokenExpiration = (token) => {

        if (!token) {
          return true;
        }
    
        try {
          const decodedPayload = JSON.parse(atob(token.split(".")[1]));
          if (!decodedPayload.exp) {
            return true;
          }
    
          const currentDate = Date.now();
          const expiryTime = decodedPayload.exp * 1000; // Convert to ms
    
          return currentDate >= expiryTime; // Return true if token is expired
        } catch (error) {
          console.error("Error decoding token:", error);
          return true; // If there's an error, treat the token as expired
        }
      };

      const isTokenExpired = getTokenExpiration(token);

  return {
        token,setToken,isTokenExpired
    }
 
}

export default useToken