import React from 'react';
import WinRate from '../../graphs/WinRate';
const WR = () => {
  return (
    <div className="test-dr">
      <div className="for-mb-returns">
        <h2>30d Rolling Win Rate</h2>
      </div>
      <WinRate model_name={'ZT1_0M24BTC1'} />
    </div>
  );
};

export default WR;
