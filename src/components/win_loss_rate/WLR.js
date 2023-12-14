// THIS COMPONENT IS BEING USED
import React from 'react';
import WinLossRatio from '../../graphs/WinLossRatio';
const WLR = () => {
  return (
    <div className="test-dr">
      <h2 className="for-mb-returns">30d Rolling Win Loss Ratio</h2>
      <WinLossRatio model_name={'live_pnls'} />
    </div>
  );
};

export default WLR;
