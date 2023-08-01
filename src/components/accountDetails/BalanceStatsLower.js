import React from 'react';
import GradientDonut from '../models/graphs/GradientDonut';

const BalanceStatsLower = (props) => {
  return (
    <div className="balance-details">
      <div className="container">
        <div className="balance-details-wrapper">
          <div className='balance-details-inner'>
            <h2 className='inner-heading'>
              BTC balance per exchange
            </h2>
            <div className='accounts-chart'>
              <GradientDonut model_name={"DailyWinsLosses"}/>
            </div>
          </div>
          <div className='balance-details-inner'>
            <h2 className='inner-heading'>
              USD balance per exchange
            </h2>
            <div className='accounts-chart'>
              <GradientDonut model_name={"DailyWinsLosses"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceStatsLower;
