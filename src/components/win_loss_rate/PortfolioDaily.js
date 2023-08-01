import React from "react";
import CurrentPortfolio from "../currentPortfolio/CurrentPortfolio";
import PerformanceLineCharts from "../performanceLineCharts/PerformanceLineCharts";
import WR from "./WR";
import WLR from "./WLR";
import PerformanceGraphs from "../performanceGraph/PerformanceGraphs";

const PortfolioDaily = () => {
  return (
    <div className="test-component">
      <div className="container">
        <WR />
        <WLR />
      </div>
    </div>
  );
};

export default PortfolioDaily;
