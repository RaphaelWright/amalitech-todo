import Todolist from "./Todolist"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

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
            logout();
        } else {
            console.log("Token is valid, setting loading to false.");
            setLoading(false);
        }
    }, []); 
    

  return (
    <div className="bg-background ">
        <div className="shadow">
        <h1 className=" flex text-4xl font-medium text-fonts py-4 ml-8">Todo List</h1>
        </div>
        <br></br>
        <Todolist  />
    </div>
  )
}

export default TodoPage