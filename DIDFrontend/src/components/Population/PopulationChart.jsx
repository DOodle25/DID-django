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

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Population",
        backgroundColor: "blue-900",
        borderColor: "blue-900",
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
      <Card className="w-full">
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
