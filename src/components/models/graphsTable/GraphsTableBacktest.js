// THIS COMPONENT IS BEING USED
import React from 'react';
import DrawDownTableBacktest from './DrawDownTableBacktest';
import './GraphsTable.css';
import WinLossTableBacktest from './WinLossTableBacktest';
import PerformanceTableBacktest from './PerformanceTableBacktest';
const GraphsTableBacktest = (props) => {
  const name = props.model_name;
  return (
    <div className="graphs-table">
      <div className="current-position">
        <div className="container">
          <div className="current-position-body">
            <h3 className="current-position-heading for-h3-font">
              Performance Metrics
            </h3>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="graph-table-main">
          <DrawDownTableBacktest model_name={name} />
          <WinLossTableBacktest model_name={name} />
          <PerformanceTableBacktest model_name={name} />
        </div>
      </div>
    </div>
  );
};

export default GraphsTableBacktest;
