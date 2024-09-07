import React from "react";
import PopulationChart from "./PopulationChart";
import PopulationData from "./PopulationData";

const Population = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-around h-screen">
      <PopulationChart />
      <PopulationData />
    </div>
  );
};

export default Population;
