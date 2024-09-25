import React from "react";
import PopulationChart from "./PopulationChart";
// import PopulationData from "./PopulationData";
import DetailsBar from "../Home/DetailsBar";

const Population = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-around">
      <PopulationChart />
      <DetailsBar />
      {/* <PopulationData /> */}
    </div>
  );
};

export default Population;
