import React from 'react';
import './CurrentPortfolio.css';
import DuplicatesForPerformance from '../models/inDepth/DuplicatesForPerformance';

const CurrentPortfolio = (props) => {
  return (
    <div className="current-portfolio">
      <div className="container">
        <DuplicatesForPerformance />
      </div>
    </div>
  );
};

export default CurrentPortfolio;
