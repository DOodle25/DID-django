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
          "http://localhost:5000/agepops/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log("okay");
        console.log(res.data);

        if (res.status !== 200) {
          navigate("/login");
          const error = new Error(res.error);
          throw error;
        }
        const sortedData = res.data.sort((a, b) => a.total_population - b.total_population);
        setAgePops(sortedData);
      } catch (err) {
        navigate("/login");
        console.log(err);
      }
    };

    getAgePops();
  }, [navigate]);

  const labels = agePops
    .map((agePop, index) =>
      agePops.length > 0 && index < 7 ? agePop.taluka_name : "Loading..."
    )
    .slice(0, 7);

  const data = agePops
    .map((agePop, index) =>
      agePops.length > 0 && index < 7 ? agePop.total_population : 0
    )
    .slice(0, 7);

  return (
    <div className="flex" style={{ fontSize: "16px" }}>
      <ul>
        {labels.map((label, index) => (
          <li className="bg-black rounded-md mb-2 px-4 mr-4 text-white hover:bg-blue-800" key={index}>
            {label}:
          </li>
        ))}
      </ul>
      <ul>
        {data.map((datum, index) => (
          <li className="rounded-xl mb-2 px-4 text-black hover:bg-black hover:text-white" key={index}>{datum}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopulationData;
