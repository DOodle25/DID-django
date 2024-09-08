import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PopulationData = () => {
  const [agePops, setAgePops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAgePops = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.get(
          // "https://myapp.vercel.app/agepops"
          "http://localhost:5000/agepops/"
          ,{ headers: {
            Authorization: `Bearer ${token}`,  // Ensure this is set correctly
          },
          withCredentials: true,
        });
        console.log("okay")
        console.log(res.data.agePops);

        if (res.status !== 200) {
          navigate("/login");
          const error = new Error(res.error);
          throw error;
        }
        const sortedData = res.data.agePops.sort((a, b) => a.Sr.No - b.Sr.No);
        setAgePops(sortedData);
        console.log(agePops); // Update state with the received data
      } catch (err) {
        navigate("/login");
        console.log(err);
      }
      // Handle other errors, e.g., network issues
    };

    getAgePops();
  }, [navigate]); // Add navigate as a dependency to useEffect
 // Add navigate as a dependency to useEffect

  console.log(agePops);

  const labels = agePops
    .map((agePop, index) =>
      agePops.length > 0 && index < 7 ? agePop.Taluka : "Loading..."
    )
    .slice(0, 7);

  const data = agePops
    .map((agePop, index) =>
      agePops.length > 0 && index < 7 ? agePop.Total : "Loading..."
    )
    .slice(0, 7);

  return (
    <div className="flex" style={{ fontSize: "16px" }}>
      <ul>
        {labels.map((label, index) => (
          <li className="font-bold" key={index}>
            {label}:
          </li>
        ))}
      </ul>
      <ul>
        {data.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopulationData;
