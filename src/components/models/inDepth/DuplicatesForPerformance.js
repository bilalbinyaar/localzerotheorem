// THIS COMPONENT IS BEING USED
import React from 'react';
import GradientDonut from '../graphs/GradientDonut';
import './InDepth.css';
import HeatMapChart from '../graphs/HeatmapChart';
const DuplicatesForPerformance = (props) => {
  return (
    <div className="in-depth">
      <div className="in-depth-charts">
        <div className="in-depth-nc for-performance-mb for-performance-nc">
          <h3>Correlation Plot</h3>
          <HeatMapChart model_name={'strategy_1'} />
        </div>
        <div className="in-depth-gd for-performance-mb portfolio-allocation-div">
          <h3>Portfolio Allocation</h3>
          <GradientDonut model_name={'strategy_collection'} />
        </div>
      </div>
    </div>
  );
};

export default DuplicatesForPerformance;
