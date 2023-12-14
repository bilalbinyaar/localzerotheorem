import React from 'react';
import './PerformanceGraphs.css';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import PerformanceMultiLine from '../../graphs/PerformanceMultiLine';

const PerformanceGraphs = () => {
  return (
    <div className="performance-graphs">
      <div className="container">
        <div className="performance-graphs-main">
          <h2>Portfolio Returns</h2>

          <div className="overview-indicators for-performance-legends">
            <div className="indicator">
              <RiCheckboxBlankFill className="indicator-long" />
              <p>PNL Sum</p>
            </div>
          </div>
          <PerformanceMultiLine model_name={'ZT1_0M24BTC1'} />
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraphs;
