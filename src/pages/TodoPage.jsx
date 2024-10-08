import Todolist from "./Todolist"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

const TodoPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    const signout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    

    // Function to get token expiration
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

            console.log("Current date: " + currentDate, "Expiry: " + expiryTime);

            return currentDate >= expiryTime; // Return true if token is expired
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // If there's an error, treat the token as expired
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token found:", token);
    
        if (!token || getTokenExpiration(token)) {
            console.log("No token or token expired, logging out...");
            signout();
        } else {
            console.log("Token is valid, setting loading to false.");
            setLoading(false);
            console.log("Loading:", loading);
        }
    }, []); 
    

  return (
    <div className=" ">
        <TopBar />
        <br></br>
        <Todolist  />
    </div>
  )
}

export default TodoPage