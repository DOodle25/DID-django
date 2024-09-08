import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const PopulationChart = () => {
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
          , { headers: {
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
        console.log(res)
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

  console.log(agePops);
// Include history in the dependency array to prevent a stale closure warning

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

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Population",
        backgroundColor: "#e28413",
        borderColor: "#e28413",
        data: data,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        suggestedMax: 500000,
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Card className="w-full mx-4 border border-black">
        <CardBody>
          <Bar
            data={chartData}
            options={options}
            style={{ height: "300px", width: "100%" }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default PopulationChart;
