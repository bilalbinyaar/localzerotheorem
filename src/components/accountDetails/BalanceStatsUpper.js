import React from 'react';
import GradientDonut from '../models/graphs/GradientDonut';

const BalanceStatsUpper = (props) => {
  return (
    <div className="balance-details">
      <div className="container">
        <div className="balance-details-wrapper">
          <div className='balance-details-inner'>
            <h2 className='inner-heading'>
              BTC balance per active strategy
            </h2>
            <div className='accounts-chart'>
              <GradientDonut model_name={"strategy_collection"} />
            </div>
          </div>
          <div className='balance-details-inner'>
            <h2 className='inner-heading'>
              USD balance per active strategy
            </h2>
            <div className='accounts-chart'>
              <GradientDonut model_name={"strategy_collection"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceStatsUpper;
