// THIS COMPONENT IS BEING USEDs
import React from 'react';
import PerformanceMultiLine from '../../graphs/PerformanceMultiLine';

const PR = () => {
  return (
    <div className="test-dr">
      <div className="for-mb-returns">
        <h2>Portfolio Returns</h2>
      </div>

      <PerformanceMultiLine model_name={'ZT1_0M24BTC1'} />
    </div>
  );
};

export default PR;
