import React from 'react';
import './InDepth.css';
import CanvasDoughnut from '../graphs/CanvasDoughnut';
import IndividualPnlCanvasjs from '../graphs/IndividualPnlCanvasjs';
const InDepth = (props) => {
  return (
    <div className="in-depth">
      <div className="container">
        <div className="in-depth-head">
          <h2>In-depth Analysis and Details</h2>
        </div>
        <div className="in-depth-charts">
          <div className="in-depth-nc">
            <h3>Individual PNL</h3>
            <div className="for-hr"></div>
            <IndividualPnlCanvasjs model_name={props.model_name} />
          </div>
          <div className="in-depth-gd">
            <h3>Win/Loss</h3>
            <div className="for-hr"></div>
            <CanvasDoughnut model_name={props.model_name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InDepth;
