import React from 'react';
import GradientDonut from '../models/graphs/GradientDonut';
import BtcBalancePerExchange from '../models/graphs/BtcBalancePerExchange';
import UsdBalancePerExchange from '../models/graphs/UsdBalancePerExchange';
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
              <BtcBalancePerExchange model_name={"collection"} />
            </div>
          </div>
          <div className='balance-details-inner'>
            <h2 className='inner-heading'>
              USD balance per exchange
            </h2>
            <div className='accounts-chart'>
              <UsdBalancePerExchange model_name={"collection"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceStatsLower;
