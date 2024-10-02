import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(`https://dummyjson.com/todos/${id}`);
      const data = await response.json();
      console.log(data.todo);
      setDetails(data);
    };

    fetchDetails();
  }, [id]);

  return (
    <div>
      <TopBar />
    <div
      style={{
        backgroundColor: "#3c3c3c",
        color: "#ffecc8",
        padding: "40px",
        borderRadius: "10px",
        maxWidth: "800px",
        margin: "50px auto",
        textAlign: "center", // Center text content
      }}
    >
      <h2 style={{ color: "#ffd09b", fontSize: "36px", marginBottom: "20px" }}>
        Task Details
      </h2>
      <p style={{ fontSize: "28px", marginBottom: "10px" }}>
        <strong>ID:</strong> {details.id}
      </p>
      <p style={{ fontSize: "28px", marginBottom: "10px" }}>
        <strong>Task:</strong> {details.todo}
      </p>
      <p style={{ fontSize: "28px", marginBottom: "10px" }}>
        <strong>Completed:</strong>{" "}
        <span
          style={{
            color: details.completed ? "#ff6666" : "#ffb0b0",
            fontWeight: "bold",
          }}
        >
          {details.completed ? "Yes" : "No"}
        </span>
      </p>
    </div>
    </div>
  );
};

export default Details;
