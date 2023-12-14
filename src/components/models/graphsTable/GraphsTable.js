import React from 'react';
import DrawDownTable from './DrawDownTable';
import './GraphsTable.css';
import PerformanceTable from './PerformanceTable';
import WinLossTable from './WinLossTable';

const GraphsTable = (props) => {
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
          <DrawDownTable model_name={name} />
          <WinLossTable model_name={name} />
          <PerformanceTable model_name={name} />
        </div>
      </div>
    </div>
  );
};

export default GraphsTable;
