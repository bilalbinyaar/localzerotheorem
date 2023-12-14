import React from 'react';
import '../models/inDepth/InDepth.css';
import KellyAllocationApexCharts from '../../graphs/Kelly_Allocation_ApexCharts';
import KellyGrowthApexCharts from '../../graphs/Kelly_Growth_ApexCharts';
const DuplicatesForPerformanceLineCharts = (props) => {
  return (
    <div className="in-depth">
      <div className="in-depth-charts">
        <div className="in-depth-nc for-performance-mb kelly-line-charts padding-bottom-kelly">
          <h2>Kelly Optimal Portfolio Allocation</h2>
          <KellyAllocationApexCharts model_name={'ZT1_0M24BTC1'} />
        </div>
        <div className="in-depth-gd for-performance-mb kelly-line-charts">
          <h2>Kelly Optimal Growth Rate</h2>
          <KellyGrowthApexCharts model_name={'ZT1_0M24BTC1'} />
        </div>
      </div>
    </div>
  );
};

export default DuplicatesForPerformanceLineCharts;
