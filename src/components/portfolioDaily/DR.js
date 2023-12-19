import React from 'react';
import PerformanceBarChart from '../../graphs/PerformanceBarChart';

const DR = () => {
  return (
    <div className="test-dr">
      <h2 className="for-mb-returns">Daily Returns</h2>
      <PerformanceBarChart model_name={'live_pnls'} />
    </div>
  );
};

export default DR;
